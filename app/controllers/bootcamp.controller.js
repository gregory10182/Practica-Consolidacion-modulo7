const db = require('../models/index.js')
const Bootcamp = db.bootcamps
const User = db.users


exports.createBootcamp = (bootcamp) => {
  return Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description
  })
  .then((project) => {
    console.log(`>> Se ha creado el proyecto: ${JSON.stringify(project, null, 4)}`)
    return project
  }).catch((err) => {
    console.log(`>> Error al crear el proyecto --> ${err}`)
  });
}

exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
  .then((bootcamp) => {
    if(!bootcamp){
      console.log(`>> No se encontro el bootcamp con id ${bootcampId}`)
      return null;
    }else{
      return User.findByPk(userId)
      .then((user) => {
        if(!user){
          console.log(`>> No se encontro el usuario con id ${userId}`)
          return null
        }else{
          bootcamp.addUser(user);
          console.log('*********************************************')
          console.log(`>> Agregando usuario con el id ${user.id} al bootcamp con el id ${bootcamp.id}`)
          console.log('*********************************************')
          return bootcamp
        }
      })
    }
  })
  .catch((err) => {
    console.log(`>> Error mientras se estaba agregando Usuario al bootcamp --> ${err}`)
  })
}

exports.findById = (bootcampId) => {
  return Bootcamp.findByPk(bootcampId, {
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName", "email"],
      through: {
        attributes: [],
      }
    }]
  })
  .then((bootcamp) => {
    return bootcamp
  })
  .catch((err) => {
    console.log(`>> Error buscando el bootcamp --> ${err}`)
  })
}

exports.findAll = () => {
  return Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName", "email"],
      through: {
        attributes: [],
      }
    }]
  })
  .then((bootcamps) => {
    return bootcamps
  }).catch((err) => {
    console.log(`>> Error buscando todos los bootcamps --> ${err}`)
  })
}