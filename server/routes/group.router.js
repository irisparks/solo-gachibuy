const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET all of users groups
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user.id);
    const queryText = ` SELECT * FROM "group"
     JOIN "groups_users" ON "groups_users".group_id = "group".id
     JOIN "user" ON "user".id = "groups_users".users
     WHERE "user"."id" = $1
     ORDER BY "group"."id" DESC;
    `;
    pool.query(queryText, [req.user.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error in get groups error:', error)
        })
});

// router.get('/', rejectUnauthenticated, (req, res) => {
//     console.log('req.user:', req.user);
//     pool.query('SELECT * FROM "secret" WHERE "secrecy_level"<=$1;', [req.user.clearance_level])
//       // Send back secret object from the session 
//         .then(results => res.send(results.rows))
//         .catch(error => {
//             console.log('Error making SELECT for secrets:', error);
//             res.sendStatus(500);
//         });
// });


// SELECT * FROM "group"
//     JOIN "groups_users" ON "groups_users".group_id = "group".id
//     JOIN "user" ON "user".id = "groups_users".users
//     WHERE "user"."id" = 1
//     ORDER BY "group"."id" DESC;

/**
 * POST route to add a group for the logged in user
 */

router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            localState,
            userArray,
        } = req.body;

        await client.query('BEGIN');

        const queryText = `INSERT INTO "group"("name", "img_src", "creator") VALUES ($1, $2, $3) RETURNING id;`;
        const newGroup = await client.query(queryText, [localState.name, localState.img_src, localState.creator])
        const newGroupId = newGroup.rows[0].id

        // await client.query('INSERT INTO "groups_users"("group_id", "users") VALUES ($1, $2);', [newGroupId, req.user.id])

        await Promise.all(userArray.map(user => {
            const newUser = 'INSERT INTO "groups_users"("group_id", "users") VALUES ($1, $2)';
            const newUserValues = [newGroupId, user]

            return client.query(newUser, newUserValues)
        }));

        await client.query('COMMIT')
        res.sendStatus(201)

    } catch (error) {
        await client.query('ROLLBACK')
        console.log('error in post group, error:', error)
        res.sendStatus(500)
    } finally {
        client.release();
    }
});




// router.post('/', rejectUnauthenticated, (req, res) => {
//     const queryText = 'INSERT INTO "group"("name", "img_src", "creator") VALUES ($1, $2, $3) RETURNING id;';
//     const queryText2 = 'INSERT INTO "groups_users"("group_id", "users") VALUES ($1, $2);';
//     pool.query(queryText, [req.body.localState.name, req.body.localState.img_src, req.body.localState.creator])
//         .then(result => {
//             const newGroupId = result.rows[0].id // id of new group
//             console.log('posted group name into group table result:', result)
//             pool.query(queryText2, [newGroupId, req.user.id])
//                 .then(result => {
//                     console.log('posted into join groups_users other users successful! result:', result)
//                     pool.query(queryText2, [newGroupId, req.body.userArray])
//                         .then(result => {
//                             res.sendStatus(200)
//                         })
//                         .catch(error => {
//                             console.log('error in adding other users', error)
//                             res.sendStatus(500)
//                         })
//                     console.log('posted into join groups_users successful! result:', result)
//                     res.sendStatus(200)
//                 })
//                 .catch(error => {
//                     console.log('error in post groups_users error:', error)
//                     res.sendStatus(500)
//                 })
//             res.sendStatus(200)
//         }).catch(error => {
//             console.log('error in adding group server', error)
//             res.sendStatus(500)
//         })
// });

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete group server', req.params.id)
    const queryText = 'DELETE FROM "groups_users" WHERE "group_id" = $1;';
    const queryText2 = 'DELETE FROM "group" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('delete successful! deleted:', result)
            pool.query(queryText2, [req.params.id])
                .then(result => {
                    res.sendStatus(200)
                }).catch(error => {
                    console.log('error in delete group from "list_item error:', error)
                    res.sendStatus(500)
                })
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error in delete group from "item" erorr:', error)
            res.sendStatus(500)
        })
});

/**
 * Update a group name and image if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('hitting edit group server', req.body, req.params.id)
    const queryText = 'UPDATE "group" SET "name" = $1, "img_src" = $2 WHERE "id" = $3;';
    pool.query(queryText, [req.body.groupName, req.body.img_src, req.params.id])
        .then(() => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error in put for group', error)
            res.sendStatus(500)
        })
});

module.exports = router;

