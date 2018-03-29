const app = require('express').Router(),
  { whatExists, addUser, getByName } = require('../models/user-model'),
  bcrypt = require('bcrypt'),
  users = require('../models/users-data'),
  lodash = require('lodash')

// RETURNS IF USER IS LOGGED
app.post('/is-loggedin', async (req, res) => {
  let loggedIn = req.session.sessionUser ? true : false
  res.json(loggedIn)
})

// RETURNS SESSION DETAILS
app.post('/get-user-details', (req, res) => res.json(req.session.sessionUser))

// USER SIGNUP
app.post('/signup', async (req, res) => {
  let {
    body: { name, email, mobile, password, passwordAgain, carModel },
    session
  } = req

  req.checkBody('name', 'Name is empty!!').notEmpty()

  req.checkBody('email', 'Email is empty!!').notEmpty()
  req.checkBody('email', 'Invalid empty!!').isEmail()

  req.checkBody('password', 'Passwords do not match!!').equals(passwordAgain)
  req.checkBody('password', 'Password field is empty').notEmpty()

  req.checkBody('mobile', 'Mobile number should not be empty!!').notEmpty()
  req.checkBody('mobile', 'Invalid mobile number').isNumeric()
  req
    .checkBody('mobile', 'Mobile number should be of 10-digit')
    .isLength({ min: 10, max: 10 })

  req.checkBody('carModel', 'Car model is empty!!').notEmpty()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {
    let nameExists = whatExists('name', name),
      emailExists = whatExists('email', email),
      mobileExists = whatExists('mobile', mobile),
      salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt)

    if (nameExists) {
      res.json({ mssg: 'Name already exists!!' })
    } else if (emailExists) {
      res.json({ mssg: 'Email ID already exists!!' })
    } else if (mobileExists) {
      res.json({ mssg: 'Mobile number already exists!!' })
    } else {
      let newUser = {
        name,
        email,
        mobile,
        carModel
      }

      session.sessionUser = newUser
      await addUser({
        ...newUser,
        password: hash,
        rating: 0,
        startFrom: '',
        destination: '',
        availableSeats: 0,
        away: 0
      })

      res.json({
        mssg: `Hello, ${name}`,
        success: true
      })
    }
  }
})

// USER LOGIN
app.post('/login', async (req, res) => {
  let { body: { username, password }, session } = req

  req.checkBody('username', 'Username is empty!!').notEmpty()
  req.checkBody('password', 'Password field is empty!!').notEmpty()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg))
    res.json({ mssg: array })
  } else {
    let mobileExists = whatExists('mobile', username),
      emailExists = whatExists('email', username)

    if (mobileExists || emailExists) {
      let { name, email, mobile, carModel } = mobileExists
          ? mobileExists
          : emailExists,
        passwordHash = getByName('password', name),
        samePassword = bcrypt.compareSync(password, passwordHash),
        newUser = {
          name,
          email,
          mobile,
          carModel
        }

      if (!samePassword) {
        res.json({ mssg: 'Wrong password!!' })
      } else {
        session.sessionUser = newUser
        res.json({
          mssg: `Welcome ${name}`,
          success: true
        })
      }
    } else {
      res.json({ mssg: 'Invalid user!!' })
    }
  }
})

// USER LOGOUT
app.post('/logout', async (req, res) => {
  req.session.sessionUser ? req.session.reset() : null
  res.json('Hello, World!!')
})

// RETURNS ALL USERS
app.post('/get-riders', async (req, res) => {
  let returnedUsers = users.filter(
      u => u.startFrom != '' && u.destination != ''
    ),
    sorted = lodash.orderBy(returnedUsers, ['away'], ['asc']),
    remPassword = sorted.map(u => {
      delete u.password
      return u
    })

  res.json(remPassword)
})

module.exports = app
