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
 * POST route to add a group for the logged in user
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = 'INSERT INTO "group"("name", "img_src") VALUES ($1, $2);';
    pool.query(queryText, [req.body.name, req.body.img_src])
    .then(result=> {
        res.sendStatus(200)
    }).catch(error=> {
        console.log('error in adding user server', error)
        res.sendStatus(500)
    })
});

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
module.exports = router;

