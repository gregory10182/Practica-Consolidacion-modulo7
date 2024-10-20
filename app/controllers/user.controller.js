const db = require('../models/index.js')
const Bootcamps = db.bootcamps
const User = db.users


exports.createUser = (user) => {
  return User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })
  .then((user) => {
    console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
    return user
  }).catch((err) => {
    console.log(`>> Error al crear el usuario --> ${err}`)
  });
}

exports.findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [{
      model: Bootcamps,
      as: "bootcamps",
      attributes: ["id", "title", "cue", "description"],
      through: {
        attributes: [],
      }
    }]
  })
  .then((user) => {
    return user
  })
  .catch((err) => {
    console.log(`>> Error buscando el usuario --> ${err}`)
  })
  .finally(() => {
    User.close
  })
}

exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamps,
      as: "bootcamps",
      attributes: ["id", "title", "cue", "description"],
      through: {
        attributes: [],
      }
    }]
  })
  .then((user) => {
    return user
  })
  .catch((err) => {
    console.log(`>> Error buscando el usuario --> ${err}`)
  })
  .finally(() => {
    User.close
  })
}

exports.updateUserById = (userId, changes) => {
  return User.findByPk(userId)
  .then((user) => {
    if(!user){
      console.log(`>> No se encontro el usuario con id ${userId}`)
      return null
    }else{
      User.update(changes, {
        where: {
          id: userId
        }
      })
      .then(() => {
        console.log(`>> Usuario ${user.id} actualizado exitosamente`)
      })
      .catch((err) => {
        console.log(`>> Ha ocurrido un error actualizando el usuario --> ${err}`)
      })
    }
  })
  .catch((err) => {
    console.log(`>> Error mientras se estaba actualizando el Usuario --> ${err}`)
  })
}

exports.deleteUserById = (userId) => {
  return User.findByPk(userId)
  .then((user) => {
    if(!user){
      console.log(`>> No se encontro el usuario con id ${userId}`)
      return null
    }else{
      User.destroy({
        where: {
          id: userId
        }
      })
      .then(() => {
        console.log(`>> Usuario ${user.id} Eliminado exitosamente`)
      })
      .catch((err) => {
        console.log(`>> Ha ocurrido un error actualizando el usuario --> ${err}`)
      })
    }
  })
  .catch((err) => {
    console.log(`>> Error mientras se estaba actualizando el Usuario --> ${err}`)
  })
}