const mongoose = require("mongoose"); 

const todoSchema = new mongoose.Schema({

  task: {
    type: String,
    unique: false, 
    required: true, 
  },
  completed: {
    type: Boolean, 
    default: false, 
  },
  listId: String,
  uuid: String,
})

const todoItems = mongoose.model("TodoItems", todoSchema) 

module.exports = todoItems
