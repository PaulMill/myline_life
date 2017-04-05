'use strict';

const bcrypt = require('bcrypt-as-promised')
const boom = require('boom')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../../knex')
const nodemailer = require('nodemailer')
const sha256 = require('sha256')
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router()

// <============== route to send lik when password forgot to user  ==================>
router.post('/forgot', (req, res, next) => {
  const email = req.body.email
  const forgot_url = '';
  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }
  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (!user) {
        throw boom.create(400, 'User with this email not registred')
      }
      const emailJSON = JSON.stringify(email)
      return sha256(emailJSON)
    })
    .then((reg_url) => {
      forgot_url = `https://myline.life/login/forgot/${reg_url}`
      return knex('users').insert({
        reg_url,
        is_registred: false
      }, '*')
    })
    .then((users) => {
    // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: `${process.env.L_G}`,
              pass: `${process.env.P_G}`
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: `"Forgot-Password-Service Myline.life" <${process.env.L_G}>`, // sender address
          to: `${email}`, // list of receivers
          subject: 'Request for changing password on www.myline.life', // Subject line
          text: 'Forgot password', // plain text body
          html: `<b>Hello dear user ${email}<br/><h4>From website <strong>www.myline.life</strong> was requested for new password to account</h4><br/><h5>Here is link to reset your password ${forgot_url}</h5><br/><br/><h5><strong>If you you are not required password reset just ignore this email and delete it</strong></h5><p>Regards,</p><br/><p>Your team from </p><br/><p><a href="https://myline.life/">MyLine.Life</a></b>` // html body
      };

    // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      })
    })
    .catch((err) => {
      console.error(err);
      next(err)
    })
})

// <============== route to set new password by link ==================>

router.patch('/newpassword', (req, res, next) => {
  const { password, url, is_registred } = req.body;
  const id = ''

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters'));
  }
  knex('users')
    .where('reg_url', url)
    .first()
    .then((user) => {
      id = user.id
      return bcrypt.hash(password, 12)
    })
    .then((hashed_password) => {
        return knex('users')
          .where('id', id )
          .update({
            hashed_password,
            reg_url: '',
            is_registred
        }, '*');
      })
    .then((users) => {
      const user = users[0];

      delete user.hashed_password
      delete user.reg_url
      delete user.is_registred

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

// <============== route to check url for new password by link ==================>
router.get('/checkuser/:url', (req, res) => {

  knex('users')
    .where('reg_url', `${req.params.url}`)
    .then((data) => {
      if(data.length){   //check if user exist(if not empty array)
        return res.send(true)
      }
      else{
        return res.send(false)
      }
    })
    .catch((err) => {
      console.error(err);
    })
})

// <============== route to create invitation to users  ==================>

// route from invitation link
router.get('/newuser/:url', (req, res, next) => {
  const reg_url = req.params.url
  knex('users')
    .where('reg_url', `${reg_url}`)
    .then((data) => {
      const user = data[0];

      if (user.is_registred) {
        throw boom.create(400, 'Bad link, User is already registred');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
})


// <============== route to signUp (registrer user)  ==================>
router.post('/newuser', (req, res, next) => {
  const {
    email, name, password, url, birthday
  } = req.body;

  if (!password || !password.trim()) {
    return next(boom.create(400, 'Admin status must not be blank'));
  }
  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(password, 12); // hashing password
    })
    .then((hashed_password) => {
      return knex('users').insert({
        email,
        name,
        hashed_password,
        url,
        birthday,
        is_registred: true
      }, '*');
    })
    .then((users) => {
      const user = camelizeKeys(users[0])
      delete user.hashedPassword
      res.send(user)
    })
    .catch((err) => {
      next(err);
    });
});


// <============== route for updating user settings from user account  ==================>

router.patch('/updates', (req, res, next) => {
  const {
    id, email, name, password
  } = req.body;

  if (name || !!name.trim()) {
    return updateName(name)
  }
  else if (email || !!email.trim()) {
    return updateEmail(email)
  }
  else if (password || !!password.trim()) {
    if (password.length < 8) {
      return next(boom.create(400, 'Password must be at least 8 characters'))
    }
    else {
      return updatePassword(password)
    }
  }
  else {
    return next(boom.create(400, 'You have to fill the fields'))
  }

  const updateName = function(name){
    knex('users')
      .where('id', id)
      .first()
      .then((user) => {
        return knex('users')
          .where('id', id )
          .update({ name }, '*');
      })
      .then((users) => {
        const user = users[0];
        delete user.hashed_password
        delete user.is_registred
        res.send(user);
      })
      .catch((err) => {
        next(err);
      });
  }
  const updateEmail = function(email){
    knex('users')
      .where('id', id)
      .first()
      .then((user) => {
        return knex('users')
          .where('id', id )
          .update({ name }, '*');
      })
      .then((users) => {
        const user = users[0];
        delete user.hashed_password
        delete user.reg_url
        delete user.is_registred
        res.send(user);
      })
      .catch((err) => {
        next(err)
      })
  }
  const updatePassword = function(password) {
    knex('users')
      .where('id', id)
      .first()
      .then((user) => {
        return bcrypt.hash(password, 12)
      })
      .then((hashed_password) => {
          return knex('users')
            .where('id', id )
            .update({ hashed_password }, '*')
        })
      .then((users) => {
        const response = 'password'
        res.send(response)
      })
      .catch((err) => {
        next(err)
      })
  }
})


// <============== route to create invitation to users  ==================>

// <============== route to get all users from admin panel ==================>

router.get('/users', (req, res, next) => {
  knex('users')
    .orderBy('email')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error('Here is error from route admin' + err);
      next(err);
    });
});

// <============== route request for registration ==================>

module.exports = router;
