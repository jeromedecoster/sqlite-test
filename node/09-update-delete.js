const Sequelize = require('sequelize')
const rimraf = require('rimraf')

rimraf.sync('./update-delete.db')

var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './update-delete.db',
  logging: null
})

var Episodes = sequelize.define('episodes', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  season: Sequelize.INTEGER,
  name: Sequelize.TEXT
}, {
  timestamps: false
})

function log() {
  return Episodes.findAll({ raw: true }).then(console.log)
}

sequelize.sync()
  .then(() => Episodes.bulkCreate([
    { id: 0, season: null, name: 'Good News Bad News' },
    { id: 1, season: 1, name: 'Male Unbonding' },
    { id: 2, season: 1, name: 'The Robbery' },
  ]))
  .then(() => log())
  .then(() => Episodes.update({
    id: 11
  }, {
    where: {
      name: 'Male Unbonding'
    }
  }))
  .then(() => Episodes.update({
    name: 'Honey Mustard',
    season: 3
  }, {
    where: {
      id: 2
    }
  }))
  .then(() => Episodes.create({ id: 129, season: 7, name: 'The Calzone' }))
  .then(() => log())
