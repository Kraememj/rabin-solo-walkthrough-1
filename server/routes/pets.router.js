const express = require('express');
const pool = require('../modules/pool');
const { query } = require('../modules/pool');
const { rejectUnauthenticated, rejectNonAdmin } = require('../modules/authentication-middleware');
const router = express.Router();


/**
 * GET route template
 */
// protect this route
router.get('/', (req, res) => {
  // This route *should* get all pets for the logged in user
  if(req.isAuthenticated() && req.user.is_admin)
  {console.log('/pet GET route');
  console.log('Is User logged in?', req.isAuthenticated());
  console.log('user info', req.user)
  
  let queryText = `SELECT * FROM "pet"
  WHERE "user_id" = $1`;
  pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
}else {
  res.sendStatus(403);
}
});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    console.log('/pet POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `INSERT INTO "pet" ("firstname", "user_id")
    VALUES $1, $2;`;
    pool.query(queryText, [req.body.firstname, req.user.id]).then(response => {
      res.sendStatus(200)
    }).catch(error => {
      console.log('error in POST;', error);
      res.sendStatus(500)
    })
  
});

module.exports = router;
