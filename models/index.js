const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.todoLists= require("./to-do-lists.model");
db.todoItems = require("./to-do-items.model");

module.exports = db;
