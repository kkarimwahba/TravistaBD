// models/employees.js
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "marketingTeam", "employee"],
    required: true,
  },
  active: { type: Boolean, default: true },
  loginTime: { type: Date },
  logoutTime: { type: Date },
  sessionDuration: { type: Number }, // in seconds
});

export default mongoose.model("Employee", employeeSchema);
