//import model
var Column = require('./../models/Column');


//display columns
exports.display_columns = function(req, res) {
    //looks at our Column Schema
    Column.find(function(err, columns) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(columns)
    });
  };

//add new column
exports.new_column = function(req,res) {
    var column = new Column();
    (req.body.name) ? column.name = req.body.name : null;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Column successfully added!' });
    });
};


//edit column name

exports.edit_column = function(req, res) {
    Column.findById(req.params.column_id, function(err, column) {
      if (err)
        res.send(err);
      (req.body.name) ? column.name = req.body.name : null;
      //save comment
      column.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Column has been updated' });
      });
    });
};


//delete column

exports.delete_column = function(req, res) {
    //selects the column by its ID, then removes it.
    Column.remove({ _id: req.params.column_id }, function(err, comment) {
      if (err)
        res.send(err);
      res.json({ message: 'Column has been deleted' })
    })
  };