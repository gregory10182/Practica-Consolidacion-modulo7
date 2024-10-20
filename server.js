const db = require("./app/models/index.js")
const userController = require('./app/controllers/user.controller.js')
const bootcampController = require('./app/controllers/bootcamp.controller.js')


const run = async () => {

  const user1 = await userController.createUser({
    firstName: "Mateo",
    lastName: "Díaz",
    email: "mateo.diaz@correo.com"
  })
  const user2 = await userController.createUser({
    firstName: "Santiago",
    lastName: "Mejías",
    email: "santiago.mejias@correo.com"
  })
  const user3 = await userController.createUser({
    firstName: "Lucas",
    lastName: "Rojas",
    email: "lucas.rojas@correo.com"
  })
  const user4 = await userController.createUser({
    firstName: "Facundo",
    lastName: "Fernandez",
    email: "facundo.fernandez@correo.com"
  })


  const bootcamp1 = await bootcampController.createBootcamp({
    title: "Introduciendo El Bootcamp De React.",
    cue: 10,
    description: "React es la librería más usada en JavaScript para el desarrollo de interfaces.",
  });

  const bootcamp2 = await bootcampController.createBootcamp({
    title: "Bootcamp Desarrollo Web Full Stack.",
    cue: 12,
    description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.",
  });

  const bootcamp3 = await bootcampController.createBootcamp({
    title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
    cue: 18,
    description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados",
  });

  await bootcampController.addUser(bootcamp1.id, user1.id)
  await bootcampController.addUser(bootcamp1.id, user2.id)
  await bootcampController.addUser(bootcamp2.id, user1.id)
  await bootcampController.addUser(bootcamp3.id, user1.id)
  await bootcampController.addUser(bootcamp3.id, user2.id)
  await bootcampController.addUser(bootcamp3.id, user3.id)


  const _bootcamp1 = await bootcampController.findById(bootcamp1.id)
  console.log(`>> Bootcamp id: ${_bootcamp1.id}, ${JSON.stringify(_bootcamp1, null, 4)}`)
  
  const _bootcamps = await bootcampController.findAll()
  console.log(`>> Bootcamps, ${JSON.stringify(_bootcamps, null, 4)}`)


  const _user1 = await userController.findUserById(user1.id)
  console.log(`>> User id: ${_user1.id}, ${JSON.stringify(_user1, null, 4)}`)

  const _users = await userController.findAll();
  console.log(`>> Users, ${JSON.stringify(_users, null, 4)}`)

  await userController.updateUserById(user1.id, {
    firstName: "Pedro",
    lastName: "Sánchez"
  })

  await userController.deleteUserById(user1.id)
}

db.sequelize.sync({
  force: true
})
.then(() => {
  console.log(`>> Eliminando y resincronizando la BBDD`)
  run()
}).catch((err) => {
  console.log(`>> Ha ocurrido un error al intentar resincronizar la BBDD ${err}`)
});