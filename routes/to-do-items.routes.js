const { authJwt } = require("../middlewares");

module.exports = app => {
    const todoItems = require("../controllers/to-do-items.controller");
    var router = require("express").Router();

    router.post('/', todoItems.create);

    router.get('/:listId', todoItems.findAll);

    router.put('/:id', todoItems.update);

    router.delete('/:id', todoItems.delete);

    app.use('/api/todos',  [authJwt.verifyToken], router);
  };
