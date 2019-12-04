const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET list
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in each groups list, group id is:', req.params.id,)
    const queryText = `SELECT "list".id,"list"."list_name" FROM "list"
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
/**
 * Delete an item if it's something the logged in user added
 * queryText to delete list id from join table "list_item"
 * queryText2 to delete list id from list table
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete item server', req.params.id)
    const queryText = 'DELETE FROM "list_item" WHERE "list_id" = $1;';
    const queryText2 = 'DELETE FROM "list" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('delete successful! deleted:', result)
            pool.query(queryText2, [req.params.id])
                .then(result => {
                    res.sendStatus(200)
                }).catch(error => {
                    console.log('error in delete item from "list_item error:', error)
                    res.sendStatus(500)
                })
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error in delete item from "item" erorr:', error)
            res.sendStatus(500)
        })
});

/**
 * Update a list name if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE "list" SET "list_name" = $1 WHERE "id" = $2;';
    pool.query(queryText, [req.body.listName, req.params.id])
        .then(() => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error in put for list', error)
            res.sendStatus(500)
        })
});

module.exports = router;


