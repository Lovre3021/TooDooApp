const { authJwt } = require("../middlewares");

module.exports = app => {
    const todoItems = require("../controllers/to-do-items.controller.js");
    var router = require("express").Router();

    router.get('/:uuid', todoItems.findByUuid);

    app.use('/api/todos/shared', router);
  };
