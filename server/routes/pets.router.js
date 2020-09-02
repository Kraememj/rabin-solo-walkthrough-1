const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // This route *should* get all pets for the logged in user

  console.log('/pet GET route');
  console.log('Is User logged in?', req.isAuthenticated());
  console.log('user info', req.user)
  
  let queryText = `SELECT * FROM "pet"`;
  pool.query(queryText).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});

// This route *should* add a pet for the logged in user
router.post('/', (req, res) => {
  console.log('/pet POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  res.sendStatus(200);
  
});

module.exports = router;
