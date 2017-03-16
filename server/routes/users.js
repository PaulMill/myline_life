'use strict';

const bcrypt = require('bcrypt-as-promised')
const boom = require('boom')
const express = require('express')
const jwt = require('jsonwebtoken')
const knex = require('../../knex')
const nodemailer = require('nodemailer')
const sha256 = require('sha256')

// eslint-disable-next-line new-cap
const router = express.Router()

// <============== route to send lik when password forgot to user  ==================>
router.post('/forgot', (req, res, next) => {
  console.log(req.body.email)
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
        throw boom.create(400, 'User with this email not registred');
      }
      const emailJSON = JSON.stringify(email);
      return bcrypt.hash(emailJSON, 8);
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
      if(data.length){
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

//route for updating(creating) user from user side
router.patch('/newuser', (req, res, next) => {
  const {
    id, email, password, Gclass, first_name, last_name, grad_date, is_registred
  } = req.body;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must be at least 8 characters'));
  }
  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      return bcrypt.hash(req.body.password, 12)
    })
    .then((hashed_password) => {
        return knex('users')
          .where('id', id )
          .update({
            first_name, last_name, email, hashed_password, Gclass, grad_date, is_registred
        }, '*');
      })
    .then((users) => {
      const user = users[0];

      const claim = {
        user_id: user.id
      };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days' // Adds an expiration field to the payload
      });

      res.cookie('token', token, { // cookie is at the header
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // lives 7 days, if you don't include expires after you log out
        secure: router.get('env') === 'production'
      });

      delete user.hashed_password
      delete user.reg_url
      delete user.is_registred

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});


// <============== route to create invitation to users  ==================>

router.post('/newusers', (req, res, next) => {
  const {
    email, first_name, last_name, is_admin
  } = req.body;

  if (!is_admin) {
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
      const emailJSON = JSON.stringify(email);
      return Buffer.from(emailJSON, 'utf8').toString('base64');
    })
    .then((reg_url) => {
      return knex('users').insert({
        email,
        first_name,
        last_name,
        is_admin,
        reg_url,
        is_registred: false
      }, '*');
    })
    .then((users) => {
      for (const user of users) {
        //creating request for sending invitation
        const emailServer = emailSend.server.connect({
           user: `${process.env.E_S_L}`,
           password: `${process.env.E_S_P}`,
           host:	"smtp-mail.outlook.com",
           tls: {ciphers: "SSLv3"}
        });

        const message	= {
           text:	`You are invited to new social network for Galvanize students Here is link for continue registration: https://students-network.herokuapp.com/newuser/${user.reg_url}`,
           from:	`Social-App Invitation <${process.env.E_S_L}>`,
           to:		`${user.first_name} ${user.last_name} <${user.email}>`,
           subject:	"Invitation to Galvanize students social network"
        };

        // send the message and get a callback with an error or details of the message that was sent
        emailServer.send(message, (err, message) => {
          if(err) {
            throw boom.create(400, `Invitation email was not sent ${err}`);
          }
         return res.send(message);
       })
      }
    })
    .catch((err) => {
      next(err);
    });
});

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

router.post('/reqnew', (req, res, next) => {
  const {
    email, first_name, last_name, g_class, grad_date
  } = req.body;

  if (!first_name || !first_name.trim()) {
    return next(boom.create(400, 'First Name must not be blank'));
  }
  if (!last_name || !last_name.trim()) {
    return next(boom.create(400, 'Last Name must not be blank'));
  }
  if (!g_class || !g_class.trim()) {
    return next(boom.create(400, 'Gclass must not be blank'));
  }
  if (!grad_date || !grad_date.trim()) {
    return next(boom.create(400, 'Graduation date must not be blank'));
  }
  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }
        //creating request for sending invitation
        const emailServer = emailSend.server.connect({
           user: `${process.env.E_S_L}`,
           password: `${process.env.E_S_P}`,
           host:	"smtp-mail.outlook.com",
           tls: {ciphers: "SSLv3"}
        });

        const message	= {
           text:	`email: ${email}, first_name: ${first_name}, last_name: ${last_name}, Gclass: ${g_class}, grad_date: ${grad_date}`,
           from:	`Social-App Invitation <${process.env.E_S_L}>`,
           to:		`usa.paul@icloud.com`,
           subject:	"Request for registration on SSN"
        };

        // send the message and get a callback with an error or details of the message that was sent
        emailServer.send(message, (err, message) => {
          if(err) {
            throw boom.create(400, `Invitation email was not sent ${err}`);
          }
         return res.send(message);
       })

});

module.exports = router;
