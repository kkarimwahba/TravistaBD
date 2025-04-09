// middleware/employeeAuthMiddleware.js

export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.employee) {
    return next();
  }
  return res.status(401).json({ message: "Not authenticated" });
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const employee = req.session.employee;
    if (!employee || !allowedRoles.includes(employee.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient privileges" });
    }
    next();
  };
};
