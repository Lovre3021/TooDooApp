const db = require("../models");

exports.create = (req, res) => {
    db.todoItems.create(req.body).then(data => {
        res.send(data);
   }).catch(err => {
    res.status(400).send({
      message:
        err.message || "Failed to create todo."
    });
});
};

 exports.findAll = (req, res) => {
    db.todoItems.find({listId: req.params.listId}).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(400).send({
          message:
            err.message || "Failed to get todos."
        });
    });
};

  exports.delete = (req, res) => {
     db.todoItems.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(400).send({
          message:
            err.message || "Failed to delete todo."
        });
    });
};

exports.update = (req, res, next) => {
        db.todoItems.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        }).then(data => {
            res.send(data);
      }).catch(err => {
        res.status(400).send({
          message:
            err.message || "Failed to update todo."
        });
    });
};

  exports.findByUuid = (req, res) => {
   try {
     const toDoList = db.toDoLists.findOne({uuid: req.params.uuid});
     const listId= toDoList.listId;
     const todos = db.todoItems.find({listId});
     return success(res, todos);
   } catch (err) {
     next({ status: 400, message: "failed to get todos" });
   }
   };
