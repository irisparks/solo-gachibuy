const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET all of users groups
 */
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "group" ORDER BY "id" DESC'
    pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error in get groups error:', error)
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;


