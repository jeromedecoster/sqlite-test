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

var Episodes = sequelize.define('episodes', {
  id: { type:Sequelize.INTEGER, primaryKey: true},
  season: Sequelize.INTEGER,
  name: Sequelize.TEXT
},
{
  timestamps: false
})

// just log the result array
function log(result) {
  result.forEach(function(data) {
    console.log(data)
  })
}

function by_name_with_uppercase() {
  return Foods.findAll({
    attributes: [
      'id',
       // note: the result column is aliased `name`
      [sequelize.fn('upper', sequelize.col('name')), 'name']
    ],
    where: {
      name:{
        $like: 'c%'
      }
    },
    raw: true
  })
  .then((result) => {
    console.log('1/')
    log(result)
  })
}

function count_where_season_1() {
  return Episodes.count({
    where: {
      season: 1
    },
    raw: true
  })
  .then((result) => {
    console.log('\n2/')
    console.log(result)
  })
}

function count_by_season() {
  return Episodes.findAll({
    attributes: [
      'season',
      // note: the result column 'goupby season' is aliased `count`
      [Sequelize.fn('COUNT'), 'count']
    ],

    // exclude the 2 episodes where season are `null`
    where: {
      season: {
        $not: null
      }
    },

    group: 'season',
    raw: true
  })
  .then((result) => {
    console.log('\n3/')
    log(result)
  })
}

sequelize.sync()
  .then(() => by_name_with_uppercase())
  .then(() => count_where_season_1())
  .then(() => count_by_season())
