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

// just log the result array
function log(result) {
  result.forEach(function(data) {
    console.log(data)
  })
}

function order_by_name_desc() {
  return Foods.findAll({
    attributes: ['id', 'name'],
    where: {
      name:{
        $like: 'b%'
      }
    },
    order: [
      ['name', 'DESC']
    ],
    raw: true
  }).then((result) => {
    console.log('1/')
    log(result)
  })
}

function order_by_lower_name_desc() {
  return Foods.findAll({
    attributes: ['id', 'name'],
    where: {
      name:{
        $like: 'b%'
      }
    },
    order: [
      [ sequelize.fn('lower', sequelize.col('name')), 'desc']
    ],
    raw: true
  }).then((result) => {
    console.log('\n2/')
    log(result)
  })
}

function order_by_type_id_then_lower_name() {
  return Foods.findAll({
    where: {
      name:{
        $like: 'b%'
      }
    },
    order: [
      ['type_id'],
      [ sequelize.fn('lower', sequelize.col('name'))]
    ],
    raw: true
  }).then((result) => {
    console.log('\n3/')
    log(result)
  })
}

sequelize.sync()
  .then(() => order_by_name_desc())
  .then(() => order_by_lower_name_desc())
  .then(() => order_by_type_id_then_lower_name())
