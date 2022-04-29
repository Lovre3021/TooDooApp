const mongoose = require("mongoose");

const toDoListsSchema = new mongoose.Schema({
    title: String,
    description: String,
    published: Boolean,
    userId: String,
    uuid: String,
    },
    { timestamps: true }
);

toDoListsSchema.methods.toJSON = function toJSON() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

const todoLists = mongoose.model("TodoLists", toDoListsSchema);

module.exports = todoLists;
