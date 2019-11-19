const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET list
 */
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "item" ORDER BY "id" DESC;'
    pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error in get items error:', error)
        })
});

/**
 * POST route to add a list for the logged in user
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'INSERT INTO "item"("item_name") VALUES ($1);';
    pool.query(queryText, [req.body.listItems])
    .then(result=> {
        res.sendStatus(200)
    }).catch(error=> {
        console.log('error in adding user server', error)
        res.sendStatus(500)
    })
});

module.exports = router;