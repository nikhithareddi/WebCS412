import express from "express";
import User from "../model/user.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User({
              email: req.body.email,
              password: hash
          });
          return user.save();
      })
      .then(result => {
          res.status(201).json({
              success: true,
              data: result
          });
      })
      .catch(error => {
          if (error.code === 11000) {
              res.status(409).json({
                  success: false,
                  message: 'Email already exists'
              });
          } else {
              res.status(500).json({
                  success: false,
                  message: 'Internal Server Error',
                  error: error
              });
          }
      });
});
router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          success: false,
          data: 'Could not find user'
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
    if (!result) {
      return res.status(401).json({
        success: false,
        data: 'password not found'
      });
    }

    const token = jwt.sign({email: req.body.email, userId: req.body.password},
      '26@NR',
      {expiresIn: '1h'});
    res.status(200).json({
      success: true,
      token: token,
      expiresIn: 3600 // expires in 1 hour (seconds)
    });

  }).catch(err => {
    console.log(err);
  });
});

export default router;
