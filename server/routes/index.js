var express = require('express');
var router = express.Router();

//require controller modules
var account_controller = require('../controllers/accountCtrl');
var column_controller = require('../controllers/columnCtrl');
var comment_controller = require('../controllers/commentCtrl');
var task_controller = require('../controllers/taskCtrk');




/* ACCOUNT ROUTES */ //TARA

//create account
//login
//logout

/* COLUMN ROUTES */ //TARA

//create column
//update column
//display tasks in column
//delete columns

/* COMMENT ROUTES */

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
//create group chat
//display messages
//create message
















//export router
module.exports = router;