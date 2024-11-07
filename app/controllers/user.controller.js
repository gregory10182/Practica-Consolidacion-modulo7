import { where } from "sequelize";
import db from "../models/index.js";
const Bootcamps = db.bootcamps;
const User = db.users;

export const createUser = (user) => {
  return User.create(user)
    .then((user) => {
      console.log(
        `>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`
      );
      return user;
    })
    .catch((err) => {
      console.log(`>> Error al crear el usuario --> ${err}`);
    });
};

export const findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamps,
        as: "bootcamps",
        attributes: ["id", "title", "cue", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((user) => {
      user = user.dataValues;
      return user;
    })
    .catch((err) => {
      console.log(`>> Error buscando el usuario --> ${err}`);
    })
    .finally(() => {
      User.close;
    });
};

export const findUserByEmail = (email) => {
  return User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(`>> Error buscando el usuario --> ${err}`);
    })
    .finally(() => {
      User.close;
    });
};

export const findAll = () => {
  return User.findAll({
    include: [
      {
        model: Bootcamps,
        as: "bootcamps",
        attributes: ["id", "title", "cue", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => {
      users = users.map((user) => user.dataValues);
      return users;
    })
    .catch((err) => {
      console.log(`>> Error buscando el usuario --> ${err}`);
    })
    .finally(() => {
      User.close;
    });
};

export const updateUserById = (userId, changes) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log(`>> No se encontro el usuario con id ${userId}`);
        return null;
      } else {
        User.update(changes, {
          where: {
            id: userId,
          },
        })
          .then(() => {
            console.log(`>> Usuario ${user.id} actualizado exitosamente`);
          })
          .catch((err) => {
            console.log(
              `>> Ha ocurrido un error actualizando el usuario --> ${err}`
            );
          });
      }
    })
    .catch((err) => {
      console.log(
        `>> Error mientras se estaba actualizando el Usuario --> ${err}`
      );
    });
};

export const deleteUserById = (userId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log(`>> No se encontro el usuario con id ${userId}`);
        return null;
      } else {
        User.destroy({
          where: {
            id: userId,
          },
        })
          .then(() => {
            console.log(`>> Usuario ${user.id} Eliminado exitosamente`);
          })
          .catch((err) => {
            console.log(
              `>> Ha ocurrido un error actualizando el usuario --> ${err}`
            );
          });
      }
    })
    .catch((err) => {
      console.log(
        `>> Error mientras se estaba actualizando el Usuario --> ${err}`
      );
    });
};
