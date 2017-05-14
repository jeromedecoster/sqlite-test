const rimraf = require('rimraf')
const sqlite = require('sqlite')

rimraf.sync('create-from-sqlite.db')

// with `sqlite` (a wrapper of `node-sqlite3`)
// create the db, create, insert, log, close
sqlite.open('create-from-sqlite.db')
  .then(() => sqlite.run('create table episodes (id integer primary key, season int, name text);'))
  .then(() => sqlite.run(`insert into "episodes" values(0, NULL, 'Good News Bad News');`))
  .then(() =>
    // insert value vith array
    sqlite.run(`insert into "episodes" values(?, ?, ?);`,
      [1, 1, 'Male Unbonding']
    )
  )
  .then(() =>
    // insert value vith plain object
    sqlite.run(`insert into "episodes" values($id, $season, $name);`,
      { $id: 2, $season: 1, $name: 'The Robbery' }
    )
  )
  .then(() => sqlite.all(`select * from 'episodes'`))
  .then((rows) => {
    rows.forEach(function(row) {
      console.log(JSON.stringify(row))
    })
    sqlite.close()
  })
