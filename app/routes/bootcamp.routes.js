import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  createBootcamp,
  findById,
  findAll,
  addUser,
} from "../controllers/bootcamp.controller.js";

const router = Router();

router.post("/api/bootcamp", auth, async (req, res) => {
  const { title, cue, description } = req.body;

  if (!title || !cue || !description) {
    return res.status(400).send({
      message: "Los campos title, cue y description son requeridos",
    });
  }

  try {
    const bootcamp = await createBootcamp({
      title,
      cue,
      description,
    });

    res.status(201).json({ message: "Bootcamp creado con éxito", bootcamp });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Ha ocurrido un error al intentar crear el bootcamp" });
  }
});

router.post("/api/bootcamp/adduser", auth, async (req, res) => {
  const { bootcampId, userId } = req.body;

  if (!bootcampId || !userId) {
    return res.status(400).send({
      message: "Los campos bootcampId y userId son requeridos",
    });
  }

  try {
    const bootcamp = await addUser(bootcampId, userId);

    if (!bootcamp) {
      return res.status(404).send({
        message: "No se encontro el bootcamp o el usuario",
      });
    }

    res.status(200).json({
      message: "Usuario agregado al bootcamp con éxito",
      bootcamp,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Ha ocurrido un error al intentar agregar el usuario" });
  }
});

router.get("/api/bootcamp/", auth, async (req, res) => {
  try {
    const bootcamps = await findAll();

    res.status(200).json({ bootcamps });
  } catch (err) {
    res.status(500).send({
      message: "Ha ocurrido un error al intentar obtener los bootcamps",
    });
  }
});

router.get("/api/bootcamp/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "El campo id es requerido",
    });
  }

  try {
    const bootcamp = await findById(id);

    if (!bootcamp) {
      return res.status(404).send({
        message: "No se encontro el bootcamp",
      });
    }

    res.status(200).json({ bootcamp });
  } catch (err) {
    res.status(500).send({
      message: "Ha ocurrido un error al intentar obtener el bootcamp",
    });
  }
});

export default router;
