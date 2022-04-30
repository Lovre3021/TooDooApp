const db = require("../models");
const ToDoLists = db.todoLists;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const toDoLists = new ToDoLists({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      userId: req.userId,
    });

    toDoLists
      .save(toDoLists)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ToDo list."
        });
      });
  };

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  condition.userId = req.userId;
  ToDoLists.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ToDo list."
      });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    ToDoLists.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found ToDo with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving ToDo with id=" + id });
      });
  };

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  ToDoLists.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Todo List with id=${id}. Maybe Todo List was not found!`
        });
      } else res.send({ message: "Todo List was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo List with id=" + id
      });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    ToDoLists.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Todo List with id=${id}. Maybe Todo List was not found!`
          });
        } else {
          res.send({
            message: "Todo List was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Todo List with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    ToDoLists.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todo Lists were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Todo Lists."
      });
    });
};

exports.findAllPublished = (req, res) => {
    ToDoLists.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Todo Lists."
        });
      });
  };


exports.findByUuid = (req, res) => {
  const uuid = req.params.uuid;
  ToDoLists.findOne({uuid: uuid})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Todo List with uuid " + uuid });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Todo List with id=" + uuid });
    });
};
