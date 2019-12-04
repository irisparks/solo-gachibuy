const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET list
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in each list:', req.params.id, 'to get items')
    const queryText = `SELECT "item".id, "item"."item_name","item_completed" FROM "item"
    JOIN "list_item" ON "list_item".item_id = "item".id
    JOIN "list" ON "list".id = "list_item".list_id
    WHERE "list"."id" = $1
    GROUP BY "list"."id","item".item_name, "item".id
    ORDER BY "item"."id" DESC;`
    pool.query(queryText, [req.params.id])
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
    console.log('in post item', req.body)
    const queryText = 'INSERT INTO "item"("item_name") VALUES ($1) RETURNING id';
    const queryText2 = 'INSERT INTO "list_item"("list_id","item_id") VALUES ($1, $2)'
    pool.query(queryText, [req.body.listItem])
        .then(result => {
            const newItemId = result.rows[0].id // id of new item
            // console.log('posted item name into item table result:', result)
            pool.query(queryText2, [req.body.setId, newItemId])// req.body for setid
                .then(result => {
                    // console.log('posted into join list_item successful! result:', result)
                    res.sendStatus(200)
                })
                .catch(error => {
                    // console.log('error in post item list_item error:', error)
                    res.sendStatus(500)
                })
        }) 
        .catch(err => {
            console.log('error in item post', err)
            res.sendStatus(500)
        })
});

// router.post('/', rejectUnauthenticated, async (req, res) => {
//     const client = await pool.connect();
//     try {
//         const {
//             listItem,
//             setId,
//         } = req.body;

//         await client.query('BEGIN');

//         const queryText = `INSERT INTO "item"("item_name") VALUES ($1) RETURNING id;`;
//         const newItem = await client.query(queryText, [req.body.listItem])
//         const newItemId = newItem.rows[0].id // id of new item

//         await Promise.all(listItem.map(item => {
//             const newItem = 'INSERT INTO "list_item"("list_id","item_id") VALUES ($1, $2);';
//             const newItemValues = [setId, newItemId]

//             return client.query(newItem, newItemValues)
//         }));

//         await client.query('COMMIT')
//         res.sendStatus(201)

//     } catch (error) {
//         await client.query('ROLLBACK')
//         console.log('error in post item, error:', error)
//         res.sendStatus(500)
//     } finally {
//         client.release();
//     }
// });
/**
 * Delete an item if it's something the logged in user added
 * queryText to delete item id from join tabke "item_name"
 * queryText2 to delete item id from item table
 */
// router.delete('/:id', rejectUnauthenticated, async (req, res) => {
//     const client = await pool.connect();
//     try {
//         await client.query('BEGIN');

//         const queryText = `DELETE FROM "list_item" WHERE "item_id" = $1;`;
//         const newGroup = await client.query(queryText, [req.params.id])

//         await Promise.all(userArray.map(user => {
//             const newUser = 'INSERT INTO "groups_users"("group_id", "users") VALUES ($1, $2)';
//             const newUserValues = [newGroupId, user]

//             return client.query(newUser, newUserValues)
//         }));

//         await client.query('COMMIT')
//         res.sendStatus(201)

//     } catch (error) {
//         await client.query('ROLLBACK')
//         console.log('error in post group, error:', error)
//         res.sendStatus(500)
//     } finally {
//         client.release();
//     }
// });

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete item server', req.params.id)
    const queryText = 'DELETE FROM "list_item" WHERE "item_id" = $1;';
    const queryText2 = 'DELETE FROM "item" WHERE "id" = $1;';
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
        })
        .catch(error => {
            console.log('error in delete item from "item" error:', error)
            res.sendStatus(500)
        })
});



/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = 'UPDATE "item" SET "item_name" = $1 WHERE "id" = $2;';
    pool.query(queryText, [req.body.listItems, req.params.id])
        .then(() => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error in put', error)
            res.sendStatus(500)
        })
});
/**
 * Update an item if completed
 */

router.put('/complete/:id', rejectUnauthenticated, (req, res) => {
    console.log('updating boolean')
    const queryText = 'UPDATE "item" SET "item_completed" =  NOT "item_completed" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error in put complete item', error)
            res.sendStatus(500)
        })
});


module.exports = router;

