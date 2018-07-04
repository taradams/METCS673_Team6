//import models
var Task = require('./../models/Task');
var Column = require('./../models/Column');

//display tasks
exports.display_tasks = function(req, res) {
    //looks at our Task Schema
    Task.find({status: req.params.column_id}).exec(function(err, tasks) {
      if (err)
        res.send(err);
      //responds with a json object of our database tasks.
      res.json(tasks)
    });
  };

//add new Task
exports.new_task = function(req,res) {
    var task = new Task();
    (req.body.task_type) ? task.task_type = req.body.task_type : null;
    (req.body.status) ? task.status = req.body.status : null;
    (req.body.assignee) ? task.assignee = req.body.assignee : null;
    (req.body.reporter) ? task.reporter = req.body.reporter : null; //maybe we make this a session thing with account ID?
    (req.body.overview) ? task.overview = req.body.overview : null;
    (req.body.details) ? task.details  = req.body.details : null;

      task.save(function(err) {
      if (err)
        res.send(err);

      //res.json({ message: 'task successfully added!' });
      res.send(task);
      console.log('task created successfully');
      console.log(task);
    });
};


//edit task 

exports.edit_task = function(req, res) {
    Task.findById(req.params._id, function(err, task) {
      if (err)
        res.send(err);

 
      (req.body.task_type) ? task.task_type = req.body.task_type : task.task_type;
      (req.body.status) ? task.status = req.body.status : task.status; //this needs to be the new column
      (req.body.assignee) ? task.assignee = req.body.assignee : task.assignee;
      (req.body.overview) ? task.overview = req.body.overview : task.overview;
      (req.body.details) ? task.details  = req.body.details : task.details;
      task.updated_date = new Date();
    
      //save task
      task.save(function(err) {
        if (err)
          res.send(err);
        
        res.send({ message: 'task has been updated'});
        console.log('task has been updated');
      });
    });
};


//delete task

exports.delete_task = function(req, res) {
    //selects the task by its ID, then removes it.
    Task.remove({ _id: req.params._id }, function(err, task) {
      if (err)
        res.send(err);

      res.json({ message: 'task has been deleted' });
      console.log('task deleted');
    })
  };