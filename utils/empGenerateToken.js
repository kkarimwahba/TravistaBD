import jwt from "jsonwebtoken";

const generateToken = (employee) => {
  return jwt.sign(
    {
      id: employee._id,
      email: employee.email,
      role: employee.role,
      username: employee.username,
    },
    process.env.JWT_SECRET || "yourSecretKey",
    { expiresIn: "1d" }
  );
};

export default generateToken;
