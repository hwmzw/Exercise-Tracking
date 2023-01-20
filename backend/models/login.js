const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const server = express.Router()
const User = require('./user.model')

server.post('/login', (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }).then(user => {
    if (!user) return res.status(404).json({ message: 'User not found' })

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      }
      

      jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err
        res.json({ success: true, token: `Bearer ${token}`
        })
      })
    })
  })
})
