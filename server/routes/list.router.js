const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET list
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in each groups list', req.params.id)
    const queryText = `SELECT "list".id,"list"."list_name", "group"."name" FROM "list"
        JOIN "group" ON "list"."group_id" = "group"."id"
        WHERE "group"."id" = $1
        GROUP BY "list"."list_name", "group"."name", "list"."id"
        ORDER BY "list"."id" DESC;`
    pool.query(queryText, [req.params.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error in get groups error:', error)
        })
});
// `SELECT "list"."list_name", "group"."name" FROM "list"
//     JOIN "group" ON "list"."group_id" = "group"."id"
//     GROUP BY "list"."list_name", "group"."name", "list"."id"
//     ORDER BY "list"."id" ASC;`
/**
 * POST route to add a list for the logged in user
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'INSERT INTO "list"("list_name","group_id") VALUES ($1, $2);';
    pool.query(queryText, [req.body.list_name, req.body.setListId])
    .then(result=> {
        res.sendStatus(200)
    }).catch(error=> {
        console.log('error in adding list in server', error)
        res.sendStatus(500)
    })
});

module.exports = router;

