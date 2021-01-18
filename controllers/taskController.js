const express = require("express");
let router = express.Router();

let { Task } = require("../models/task.js");
 
var ObjectID = require("mongoose").Types.ObjectID;
var ObjectID = require('mongodb').ObjectID;
// => localhost:3000/tasks/

//return all tasks
router.get('/', (req, res) => {
  Task.find((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving tasks :' + JSON.stringify(err, undefined, 2)); }
  });
});

// return single task
router.get("/:id", (req, res) => {
  //   console.log(JSON.parse(req.params.id), "Request");
    Task.find((err, docs) => {
      if (!err) {
      res.send(docs);
        
      } else {
        console.log(
          "Error in Retriving Task :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
  
  });

// post task data into db
router.post("/", (req, res) => {
  var taskObj = new Task({
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    dateCreated: req.body.dateCreated,
    dateCompleted: req.body.dateCompleted,
    markedComplete: req.body.markedComplete
  });
  taskObj.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Saving new Task :" + JSON.parse(err, undefined, 2));
    }
  });
});

// update task data in db
router.put("/:id", (req, res) => {
  console.log(req.params.id);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`No task record with given id : ${req.params.id}`);

  var taskObj = {
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    dateCreated: req.body.dateCreated,
    dateCompleted: req.body.dateCompleted,
    markedComplete: req.body.markedComplete
  };
  Task.findByIdAndUpdate(req.params.id, { $set: taskObj }, { new: true }, (err, doc) =>{
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in updating task :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
});

// delete task data in db
router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Task.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in Deleting Task :" + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
