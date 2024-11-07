import { findAll } from "../controllers/user.controller.js";

export default async (req, res, next) => {
  const { email } = req.body;

  const users = await findAll();

  const user = users.find((user) => user?.email === email);

  if (user) {
    return res.status(400).send({ message: "El email ya está en uso" });
  }

  next();
};
