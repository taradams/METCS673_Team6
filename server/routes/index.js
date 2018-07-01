var express = require('express');
var router = express.Router();

//require controller modules
var account_controller = require('../controllers/accountCtrl');
var column_controller = require('../controllers/columnCtrl');
var comment_controller = require('../controllers/commentCtrl');
var task_controller = require('../controllers/taskCtrk');




/* ACCOUNT ROUTES */ //TARA

//POST request for account authentication
router.post('/login',  accountCtrl.account_login_post);

//GET request for logout
router.get('/logout', accountCtrl.logout_get);


//POST request for creating an Account
router.post('/createaccount',  accountCtrl.account_create_post);

//GET request to display account information
//router.get('/account', account_controller.account_detail);

/* COLUMN ROUTES */ //TARA

//GET request for displaying columns
router.get('/columns', columnCtrl.display_columns);

//POST request for adding new column
router.post('/columns', columnCtrl.new_column);

//PUT request for updating column name
router.put('/columns/:column_id', columnCtrl.edit_column);

//DELETE request for deleting
router.delete('/columns/:column_id', columnCtrl.delete_column);


/* COMMENT ROUTES */ //N/a for this iteration

/* TASK ROUTES */ //FRED

//display tasks
//create task
//delete task
//update task column
//update task information

/* TASK (type = bug) ROUTES */
//display issues
//create issue
//delete issue
//update issue column
//update issue information

/* CHAT ROUTES */   //TARA

//GET request for displaying messages
router.get('/chat', messageCtrl.display_messages);

//POST request for adding new message
router.post('/chat', messageCtrl.new_message);







//export router
module.exports = router;