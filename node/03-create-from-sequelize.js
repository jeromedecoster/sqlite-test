const Sequelize = require('sequelize')
const rimraf = require('rimraf')

rimraf.sync('create-from-sequelize.db')

// with `sequelize` (an ORM wrapper of `node-sqlite3`)
// create the db, create, insert, log, close
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './create-from-sequelize.db',
  logging: false
})

var Episodes = sequelize.define('episodes', {
  id: { type:Sequelize.INTEGER, primaryKey: true},
  season: Sequelize.INTEGER,
  name: Sequelize.TEXT
},
{
  // do not create columns `createdAt` and `updatedAt`
  // note: `timestamps: false` is a shortcut of `createdAt: false` and `updatedAt: false`
  timestamps: false
})

// `sync` create the db if needed, otherwise, just connect to the db
sequelize.sync()
  // `create` build a new model instance and save it (just means insert a new row)
  // http://docs.sequelizejs.com/en/v3/api/model/#createvalues-options-promiseinstance
  .then(() => Episodes.create({id:0, season: null, name:'Good News Bad News'}))
  // `bulkCreate` insert multiple rows
  // http://docs.sequelizejs.com/en/v3/api/model/#bulkcreaterecords-options-promisearrayinstance
  .then(() => Episodes.bulkCreate([
      {id:1, season: 1, name:'Male Unbonding'},
      {id:2, season: 1, name:'The Robbery'},
    ]))
  .then(() => {
    Episodes.findAll().then((result) => {
      result.forEach(function(data) {
          console.log(data.dataValues)
        })
    })
  })

/*
  important !

  to chain each then step one by one correctly:

  -> then must use implicit return: 1 js command without the use of {} or ()
  .then(() => Episodes.create({}) )

  -> then must use implicit return: 1 js command with ()
  .then(() => ( Episodes.create({}) ) )

  -> then must use explicit return: 1 or more js command with { return }
  .then(() => {
    // ...can have other commands here...
    return Episodes.create({})
  } )
*/
