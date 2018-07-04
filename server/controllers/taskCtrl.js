//import model
var Task = require('./../models/Task');


//display tasks
exports.display_tasks = function(req, res) {
    //looks at our Task Schema
    Task.find(function(err, tasks) {
      if (err)
        res.send(err);
      //responds with a json object of our database tasks.
      res.json(tasks)
    });
  };

//add new Task
exports.new_task = function(req,res) {
    var task = new Task();
    (req.body.type) ? task.type = req.body.type : null;
    (req.body.status) ? task.status = req.body.status : null; //this needs to be whatever column we're adding it to
    (req.body.assignee) ? task.Assignee = req.body.assignee : null;
    (req.session.accountId) ? task.Reporter = req.session.accountId : null;
    (req.body.overview) ? task.overview = req.body.overview : null;
    (req.body.details) ? task.details  = req.body.details : null;

      task.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'task successfully added!' });
      console.log(tasks);
    });
};


//edit task name

exports.edit_task = function(req, res) {
    task.findById(req.params.id, function(err, task) {
      if (err)
        res.send(err);

 
      (req.body.type) ? task.type = req.body.type : task.type;
      (req.body.status) ? task.status = req.body.status : task.status; //this needs to be the new column
      (req.body.assignee) ? task.Assignee = req.body.assignee : task.Assignee;
      (req.body.overview) ? task.overview = req.body.overview : task.overview;
      (req.body.details) ? task.details  = req.body.details : task.details;
      task.updated_date = Date.now;
    
      //save task
      task.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'task has been updated' });
        console.log('task has been updated');
      });
    });
};


//delete task

exports.delete_task = function(req, res) {
    //selects the task by its ID, then removes it.
    task.remove({ _id: req.params.id }, function(err, task) {
      if (err)
        res.send(err);

      res.json({ message: 'task has been deleted' });
      console.log('task deleted');
    })
  };