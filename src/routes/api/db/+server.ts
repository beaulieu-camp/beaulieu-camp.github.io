import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await 
(async () => {
    // open the database
    const db = await open({
      filename: './test.sqlite',
      driver: sqlite3.Database
    })

    // await db.exec('CREATE TABLE tabl (col TEXT)')
    // await db.exec('INSERT INTO tabl VALUES ("test")')
    // const result = await db.get('SELECT col FROM tabl WHERE col = ?', 'test')
    // console.log(result)

    db.close()
})()

setInterval((e) => (console.log(Date.now())),1000)
