const Sequelize = require('sequelize')

var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './foods.db',
  logging: null
})

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

function order_by_name_limit_10() {
  return Foods.findAll({
    attributes: ['name'],
    where: {
      name:{
        $like: 'c%'
      }
    },
    order: 'name',
    limit: 10,
    raw: true
  }).then((result) => {
    console.log('1/')
    log(result)
  })
}

function order_by_name_limit_10_offset_2() {
  return Foods.findAll({
    attributes: ['name'],
    where: {
      name:{
        $like: 'c%'
      }
    },
    order: 'name',
    limit: 10,
    offset: 2,
    raw: true
  }).then((result) => {
    console.log('\n2/')
    log(result)
  })
}

sequelize.sync()
  .then(() => order_by_name_limit_10())
  .then(() => order_by_name_limit_10_offset_2())
