const TodoCtrl = {};
const Todo = require('../models/Todo');
const User = require("../models/User")

TodoCtrl.renderTodo = (req, res) => {
    res.render('todos/create-todos');
}
TodoCtrl.createTodo = async(req, res) => {
    const { description, category, date } = req.body;
    const errors = [];
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("todos/new-todos", {
            errors,
            description,
        });
    } else {
        const newTodo = new Todo({ description, category, date });
        newTodo.user = req.user.id;
        await newTodo.save();
        console.log(req.body);
        req.flash("success_msg", "Todo Added Successfully");
        res.redirect("/todos/todolist");
    }
};
TodoCtrl.renderTodolist = async(req, res) => {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: "desc" }).lean();
    const user = await User.find({ user: req.user.id }).lean();
    res.render("todos/todolist", { todos, user });
};
TodoCtrl.renderEdit = async(req, res) => {
    const todos = await Todo.findById(req.params.id).lean();
    console.log(req.user.id);
    if (todos.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/todos/todolist");
    }
    res.render("todos/edit-todos", { todos });
}

TodoCtrl.updateTodo = async(req, res) => {
    const { description, category, date } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { description, category, date });
    req.flash("success_msg", "Todo Updated Successfully");
    res.redirect("/todos/todolist");
}
TodoCtrl.DeleteTodo = async(req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Todo Deleted Successfully");
    res.redirect("/todos/todolist");
}

module.exports = TodoCtrl;