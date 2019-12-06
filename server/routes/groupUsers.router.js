const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('getting users for group:', req.params.id, req.body)
    let queryText = `SELECT username FROM "group"
        JOIN "groups_users" ON "groups_users".group_id = "group".id
        JOIN "user" ON "user".id = "groups_users".users
        WHERE "groups_users"."group_id" = $1
        ORDER BY "group"."id" DESC;`;
    pool.query(queryText, [req.params.id]).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error finding users', error);
            res.sendStatus(500);
        });
});

module.exports = router;