const { authJwt } = require("../middlewares");

module.exports = app => {
    const todoLists = require("../controllers/to-do-lists.controller.js");
    var router = require("express").Router();

    router.get('/:uuid', todoLists.findByUuid);

    app.use('/api/to-do-list/shared', router);
  };
