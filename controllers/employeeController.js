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
  const { name, phone, username, role, active } = req.body;

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      name,
      phone,
      username,
      role,
      active: typeof active === "boolean" ? active : undefined, // Only update if provided
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

export const toggleEmployeeStatus = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Toggle the active status
    employee.active = !employee.active;

    await employee.save();

    res.json({
      message: `Employee status changed to ${
        employee.active ? "active" : "inactive"
      }`,
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        active: employee.active,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
