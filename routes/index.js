var express = require('express');
var router = express.Router();

//require controller modules
var accountCtrl = require('../controllers/accountCtrl');
var columnCtrl = require('../controllers/columnCtrl');
var commentCtrl = require('../controllers/commentCtrl');
var taskCtrl = require('../controllers/taskCtrl');
var messageCtrl = require('../controllers/messageCtrl');



/* ~~~~~~~~~~~~~~~~~~~~ACCOUNT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
   
//POST request for creating an Account
router.post('/createaccount',  accountCtrl.account_create_post);

//POST request for account authentication
router.post('/login',  accountCtrl.account_login_post);

//GET request to see if a session is running
router.get('/user', accountCtrl.get_user);

//GET request for logout
router.get('/logout', accountCtrl.logout_get);

//GET request to display account information
router.get('/accounts', accountCtrl.get_accounts); 

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~COLUMN ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ 

//GET request for displaying columns
router.get('/columns', columnCtrl.display_columns);

//POST request for adding new column
router.post('/columns', columnCtrl.new_column);

//PUT request for updating column name
router.put('/columns/:_id', columnCtrl.edit_column);

//DELETE request for deleting
router.delete('/columns/:_id', columnCtrl.delete_column);


/* COMMENT ROUTES */ //N/a for this iteration

/* ~~~~~~~~~~~~~~~~~~~~~~~~TASK ROUTES~~~~~~~~~~~~~~~~~~~~~ */ 

//GET request for displaying tasks
router.get('/tasks/:column_id', taskCtrl.display_tasks);

//GET request for displaying tasks bugs
router.get('/tasks', taskCtrl.display_tasks_bugs);

//POST request for adding new task
router.post('/tasks', taskCtrl.new_task);

//PUT request for updating task
router.put('/tasks/:_id', taskCtrl.edit_task);

//DELETE request for deleting
router.delete('/tasks/:_id', taskCtrl.delete_task);


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CHAT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */   

//GET request for displaying messages
router.get('/chat', messageCtrl.display_messages);

//POST request for adding new message
router.post('/chat', messageCtrl.new_message);







//export router
module.exports = router;