const Package = require("../models/packages");
const User = require("../models/user");
const ApplyForPackage = require("../models/applyForPackage");
const BuildPackage = require("../models/buildPackage");
const VisaLead = require("../models/visalead");

exports.getDashboardOverview = async (req, res) => {
  try {
    const [totalPackages, totalBookings, buildForms, visaForms] =
      await Promise.all([
        Package.countDocuments(),
        ApplyForPackage.countDocuments(),
        BuildPackage.countDocuments(),
        VisaLead.countDocuments(),
      ]);

    const newForms = buildForms + visaForms;

    // Active customers from booking/buildmypackage/visaLead
    const bookingEmails = await ApplyForPackage.distinct("email");
    const buildEmails = await BuildPackage.distinct("email");
    const visaPhones = await VisaLead.distinct("phoneNumber");

    const emailSet = new Set([...bookingEmails, ...buildEmails]);
    const phoneSet = new Set(visaPhones);
    const activeCustomers = new Set([...emailSet, ...phoneSet]).size;

    // Most booked package
    const bookingsAgg = await ApplyForPackage.aggregate([
      {
        $group: {
          _id: "$packageId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    let mostBookedPackage = null;
    if (bookingsAgg.length > 0) {
      const packageDoc = await Package.findById(bookingsAgg[0]._id);
      if (packageDoc) {
        mostBookedPackage = {
          name: packageDoc.packageName,
          bookings: bookingsAgg[0].count,
        };
      }
    }

    // Recent bookings
    const recentBookingsRaw = await ApplyForPackage.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("packageId", "packageName");

    const recentBookings = recentBookingsRaw.map((b) => ({
      title: `${b.packageId?.packageName || "Package"} Booked`,
      time: timeAgo(b.createdAt),
    }));

    // Recent forms from BuildPackage + VisaLead
    const buildRecent = await BuildPackage.find()
      .sort({ createdAt: -1 })
      .limit(3);
    const visaRecent = await VisaLead.find().sort({ createdAt: -1 }).limit(3);

    const recentForms = [
      ...buildRecent.map((f) => ({
        title: `${f.firstName} ${f.lastName} built a package`,
        time: timeAgo(f.createdAt),
      })),
      ...visaRecent.map((f) => ({
        title: `${f.firstName} ${f.lastName} applied for visa`,
        time: timeAgo(f.createdAt),
      })),
    ]
      .sort((a, b) => new Date(b.timeRaw) - new Date(a.timeRaw))
      .slice(0, 5); // keep only 5

    res.status(200).json({
      totalPackages,
      totalBookings,
      activeCustomers,
      blogPosts: 0,
      newForms,
      mostBookedPackage,
      recentBookings,
      recentForms,
    });
  } catch (err) {
    console.error("Dashboard overview error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Convert to readable "x time ago"
function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
