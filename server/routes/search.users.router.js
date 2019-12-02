const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
        let queryText = 'SELECT "id", "username" FROM "user" ORDER BY "username";';
        pool.query(queryText).then(result => {
            // Sends back the results in an object
            res.send(result.rows);
        })
            .catch(error => {
                console.log('error searching users', error);
                res.sendStatus(500);
            });
});

module.exports = router;