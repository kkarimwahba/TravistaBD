// controllers/authController.js
import Employee from "../models/employees.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/empGenerateToken.js";

export const register = async (req, res) => {
  const { email, username, empId, name, phone, password, role, active } =
    req.body;

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
      active: typeof active === "boolean" ? active : true, // Default to true if not specified
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

    if (!employee.active) {
      return res.status(403).json({
        message: "Account is inactive. Please contact an administrator.",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const now = new Date();
    employee.loginTime = now;
    await employee.save();

    const token = generateToken(employee);

    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        role: employee.role,
        email: employee.email,
        name: employee.name,
        empId: employee.empId,
        phone: employee.phone,
        username: employee.username,
        active: employee.active,
      },
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
