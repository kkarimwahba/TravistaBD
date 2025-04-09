// controllers/authController.js
import Employee from "../models/employees.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, username, empId, name, phone, password, role } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee)
      return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      email,
      username,
      empId,
      name,
      phone,
      role,
      password: hashedPassword,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee registered successfully",
      employee: newEmployee,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate session ID and store it in the session object
    const sessionId = req.sessionID;

    req.session.employee = {
      id: employee._id,
      role: employee.role,
      email: employee.email,
      name: employee.name,
      empId: employee.empId,
      phone: employee.phone,
      username: employee.username,
    };

    // Set cookie with session ID
    res.cookie("sessionId", sessionId, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === "production", // Set to true for HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiration time (e.g., 1 day)
    });

    const now = new Date();
    employee.loginTime = now;
    await employee.save();

    res.status(200).json({
      message: "Login successful",
      employee: req.session.employee,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const employee = await Employee.findById(req.session.employee.id);
    const logoutTime = new Date();
    const duration = (logoutTime - employee.loginTime) / 1000;

    employee.logoutTime = logoutTime;
    employee.sessionDuration = duration;
    await employee.save();

    req.session.destroy(() => {
      res
        .status(200)
        .json({ message: "Logged out", sessionDuration: duration });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
