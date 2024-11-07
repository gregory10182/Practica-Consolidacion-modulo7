import db from "../models/index.js";
const Bootcamp = db.bootcamps;
const User = db.users;

export const createBootcamp = (bootcamp) => {
  return Bootcamp.create(bootcamp)
    .then((bootcamp) => {
      console.log(
        `>> Se ha creado el proyecto: ${JSON.stringify(bootcamp, null, 4)}`
      );
      return bootcamp;
    })
    .catch((err) => {
      console.log(`>> Error al crear el proyecto --> ${err}`);
    });
};

export const addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log(`>> No se encontro el bootcamp con id ${bootcampId}`);
        return null;
      } else {
        return User.findByPk(userId).then((user) => {
          if (!user) {
            console.log(`>> No se encontro el usuario con id ${userId}`);
            return null;
          } else {
            bootcamp.addUser(user);
            console.log("*********************************************");
            console.log(
              `>> Agregando usuario con el id ${user.id} al bootcamp con el id ${bootcamp.id}`
            );
            console.log("*********************************************");
            return bootcamp;
          }
        });
      }
    })
    .catch((err) => {
      console.log(
        `>> Error mientras se estaba agregando Usuario al bootcamp --> ${err}`
      );
    });
};

export const findById = (bootcampId) => {
  return Bootcamp.findByPk(bootcampId, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName", "email"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamp) => {
      return bootcamp.dataValues;
    })
    .catch((err) => {
      console.log(`>> Error buscando el bootcamp --> ${err}`);
    });
};

export const findAll = () => {
  return Bootcamp.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName", "email"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamps) => {
      bootcamps = bootcamps.map((bootcamp) => bootcamp.dataValues);
      return bootcamps;
    })
    .catch((err) => {
      console.log(`>> Error buscando todos los bootcamps --> ${err}`);
    });
};
