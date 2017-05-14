const Sequelize = require('sequelize')


var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './foods.db',
  // logging: null
})

var Foods = sequelize.define('foods', {
  id: { type:Sequelize.INTEGER, primaryKey: true},
  type_id: Sequelize.INTEGER,
  name: Sequelize.TEXT
}, {
  timestamps: false
})

var FoodTypes = sequelize.define('food_types', {
  id: { type:Sequelize.INTEGER, primaryKey: true},
  name: Sequelize.TEXT
}, {
  timestamps: false
})

// FoodTypes.belongsTo(Foods, { foreignKey: 'type_id' })
// FoodTypes.hasMany(Foods)
// Foods.belongsTo(FoodTypes, { foreignKey: 'id', as: 'types' })

// Foods.hasMany(FoodTypes)
// FoodTypes.belongsTo(Foods, { foreignKey: 'type_id', as: 'types' })

sequelize.sync().then(() => {
  // return
  Foods.findAll({

    include: [
    { model: FoodTypes }
  ],
    // attributes: [
    //   'food.name',
    //   [sequelize.fn('upper', sequelize.col('name')), 'name']
    // ],
    // where: {
    //   name:{
    //     $like: 'c%'
    //   }
    // },
    // order: 'name',
    limit: 50,
    // offset: 2,
    raw: true

  }).then((result) => {

      result.forEach(function(data) {
          console.log(data)
        })
      console.log(result.length)
    })
  })

