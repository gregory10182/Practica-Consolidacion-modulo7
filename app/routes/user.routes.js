import { Router } from "express";
import verifyToken from "../middleware/auth.js";
import verifySignUp from "../middleware/verifySingUp.js";
import secret from "../config/auth.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserById,
  findAll,
  findUserByEmail,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/api/signup", verifySignUp, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(password, salt);

    await createUser({ firstName, lastName, email, password: encryptedPass });

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    let user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const tkn = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.status(200).json({ token: tkn });
  } catch (err) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

router.get("/api/user", verifyToken, async (req, res) => {
  try {
    const users = await findAll();
    res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

router.get("/api/user/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    let user = await findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

router.put("/api/user/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  if (req.user.id !== parseInt(id)) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta acción" });
  }

  try {
    await updateUserById(id, { firstName, lastName, email, password });

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

router.delete("/api/user/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  let user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (req.user.id !== parseInt(id)) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para realizar esta acción" });
  }

  try {
    await deleteUserById(id);

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    return res.status(500).json({ message: "Error al eliminar el usuario" });
  }
});

export default router;
