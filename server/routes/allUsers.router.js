const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET all of users 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(' in get all users server side eq.user:', req.user.id);
    const queryText = ` SELECT "id", "username" FROM "user" `;
    pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error in get all users error:', error)
        })
});


module.exports = router;
