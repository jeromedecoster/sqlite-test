const Sequelize = require('sequelize')
const Table = require('easy-table')

var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './foods.db',
  logging: null
})

var Foods = sequelize.define('foods', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  type_id: Sequelize.INTEGER,
  name: Sequelize.TEXT
}, {
  timestamps: false
})

var FoodTypes = sequelize.define('food_types', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  name: Sequelize.TEXT
}, {
  timestamps: false
})

// One-To-One associations
// One-To-One associations are associations between exactly two models connected by a single foreign key.
// https://github.com/sequelize/sequelize/blob/688dd002b486b77ebd1de5d902c94ab53c70317a/docs/associations.md#one-to-one-associations

// BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
// https://github.com/sequelize/sequelize/blob/688dd002b486b77ebd1de5d902c94ab53c70317a/docs/associations.md#belongsto
Foods.belongsTo(FoodTypes, { foreignKey: 'type_id' })

/*
from the sequelize doc

A simple example would be a `Player` being part of a `Team` with the foreign key on the player.

var Player = this.sequelize.define('player', { ...attributes... })
var Team  = this.sequelize.define('team', { ...attributes... })

Player.belongsTo(Team) // Will add a teamId attribute to Player to hold the primary key value for Team
*/

sequelize.sync().then(() => {
  Foods.findAll({
    include: [
      { model: FoodTypes }
    ],
    limit: 50,
    raw: true
  }).then((result) => {

    var t = new Table

    result.forEach(function(data) {
      console.log(data)

      t.cell('id', data.id)
      t.cell('type_id', data.type_id)
      t.cell('name', data.name)
      t.cell('food_type.id', data['food_type.id'])
      t.cell('food_type.name', data['food_type.name'])
      t.newRow()
    })
    console.log('\n' + t.toString())
  })
})
