// controllers/employeeController.js
import Employee from "../models/employees.js";

export const getAllEmployees = async (req, res) => {
  const employees = await Employee.find({}, "-password");
  res.json(employees);
};

export const getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id, "-password");
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
};

export const updateEmployee = async (req, res) => {
  const { name, phone, username, role } = req.body;

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      name,
      phone,
      username,
      role,
    },
    { new: true, select: "-password" }
  );

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.json({ message: "Employee updated", employee });
};

export const deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.json({ message: "Employee deleted successfully" });
};
