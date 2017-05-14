const Sequelize = require('sequelize')

// create the connexion instance
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './foods.db',
  logging: null
})

// create the `foods` model
var Foods = sequelize.define('foods', {
  id: { type:Sequelize.INTEGER, primaryKey: true},
  type_id: Sequelize.INTEGER,
  name: Sequelize.TEXT
}, {
  timestamps: false
})

// `sync` create the db if needed, otherwise, just connect to the db
sequelize.sync().then(() =>
  // impicit return without => ()
  Foods.findAll({limit:10}).then((result) => {
    console.log('1/')
    result.forEach(function(data) {
        console.log(data.dataValues)
      })
    })
  )
  .then(() => (
    // impicit return with => ()
    Foods.findAll({
      where:{
        name:{
          $like: 'j%'
        }
      }
    })
    .then((result) => {
      console.log('\n2/')
      result.forEach(function(data) {
          console.log(data.dataValues)
        })
    })
  ))
  .then(() => {
    // explicit return with { return }
    // http://sequelize.readthedocs.io/en/latest/docs/models-usage/#raw-queries
    return Foods.findAll({
      where:{
        name:{
          $like: '%j%'
        }
      },
      limit:10,
      raw:true
    }).then((result) => {
      console.log('\n3/')
      result.forEach(function(data) {
          console.log(data)
        })
    })
  })
  .then(() =>
    // glob not supported by sequelize, pass by a raw query
    // http://sequelize.readthedocs.io/en/latest/api/sequelize/#querysql-options-promise
    sequelize.query(`select id, name from foods where name glob 'j*';`).spread((results) => {
      console.log('\n4/')
      console.log(results)
    })
  )
  .then(() =>
    // http://sequelize.readthedocs.io/en/latest/api/sequelize/#querysql-options-promise
    sequelize.query(`select id, name from foods where name glob 'J*';`).spread((results) => {
      console.log('\n5/')
      console.log(results)
    })
  )
