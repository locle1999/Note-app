const { Router } = require('express');
const router = Router();
const { renderTodo, createTodo, renderTodolist, renderEdit, updateTodo, DeleteTodo } = require('../controllers/todo.controller');
const { isAuthenticated } = require('../helpers/auth');

router.get('/todos/todos', isAuthenticated, renderTodo);
router.post('/todos/create-todos', isAuthenticated, createTodo);
router.get('/todos/todolist', isAuthenticated, renderTodolist)

// edit
router.get("/todos/edit/:id", isAuthenticated, renderEdit);
router.put("/todos/edit-todos/:id", isAuthenticated, updateTodo);
//delete
router.delete("/todos/delete/:id", isAuthenticated, DeleteTodo);

module.exports = router;