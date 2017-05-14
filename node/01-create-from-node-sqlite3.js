const sqlite3 = require('sqlite3').verbose()
const rimraf = require('rimraf')

rimraf.sync('create-from-node-sqlite3.db')

let db

// with `node-sqlite3`
// create the db
db = new sqlite3.Database('create-from-node-sqlite3.db', () => {
  // create the table
  db.run("create table episodes (id integer primary key, season int, name text);", () => {
    // insert one row
    db.run(`insert into "episodes" values(0, NULL, 'Good News Bad News');`, () => {
      // insert with values in an array
      db.run(`insert into "episodes" values(?, ?, ?);`, [1, 1, 'Male Unbonding'], () => {
        // insert with values in an object
        db.run(`insert into "episodes" values($id, $season, $name);`, { $id: 2, $season: 1, $name: 'The Robbery' }, () => {
          // log
          db.all(`select * from 'episodes'`, function(err, rows) {
            rows.forEach(function(row) {
              console.log(JSON.stringify(row))
            })
            // close the db
            db.close()
          })
        })
      })
    })
  })
})
