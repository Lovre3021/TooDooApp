const { authJwt } = require("../middlewares");

module.exports = app => {
    const todoLists = require("../controllers/to-do-lists.controller.js");
    var router = require("express").Router();

    router.post("/", todoLists.create);

    router.get("/", todoLists.findAll);

    router.get("/published", todoLists.findAllPublished);

    router.get("/:id", todoLists.findOne);

    router.put("/:id", todoLists.update);

    router.delete("/:id", todoLists.delete);

    router.delete("/", todoLists.deleteAll);
    app.use('/api/to-do-lists',  [authJwt.verifyToken], router);
  };
