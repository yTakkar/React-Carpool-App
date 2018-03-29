const users = require('./users-data'),
  { appendFileSync, unlinkSync } = require('fs')

/** RETURNS FALSE IF WHAT'S VALUE DOES NOT EXISTS OTHERWISE AN OBJ OF INFO */
const whatExists = (what, value) => {
  let returnedUser = users.find(u => u[what] == value)
  return returnedUser ? returnedUser : false
}

/** RETURNS ALL THE WHAT OF USER BY NAME  */
const getByName = (what, name) => {
  let returnedUser = users.find(u => u.name == name)
  return returnedUser[what]
}

/** ADDS A NEW USER */
const addUser = newUser => {
  let root = process.cwd(),
    final = JSON.stringify([newUser, ...users], null, 2)
  unlinkSync(`${root}/models/users-data.js`)
  appendFileSync(`${root}/models/users-data.js`, `module.exports = ${final}`)
}

module.exports = {
  whatExists,
  addUser,
  getByName
}
