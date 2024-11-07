import jwt from "jsonwebtoken";
import secret from "../config/auth.config.js";

export default (req, res, next) => {
  let token = req.body?.token || req.query?.token || req.headers.authorization;
  token = token?.replace("Bearer ", "");
  if (!token) {
    return res.status(403).send({
      message: "Un token es requerido para la autorizacion",
    });
  }
  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      message: "Token invalido, acceso denegado",
    });
  }

  next();
};
