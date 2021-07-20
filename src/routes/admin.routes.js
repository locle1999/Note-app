const { Router } = require('express');
const router = Router();

const { renderAdmin, renderCreateFrom, renderCreateuser, renderAdminlist, renderEdit, updateUser, Delete } = require('../controllers/admin.controller')
const { isAuthenticated } = require('../helpers/auth');
//router.get('/admin/admind', renderAdmin)

router.get('/admin/create-user', renderCreateFrom)
router.post('/admin/create-user', renderCreateuser)

router.get('/admin/admid', renderAdminlist)

//edit
router.get("/admin/edit/:id", isAuthenticated, renderEdit);
router.put("/admin/edit-user/:id", isAuthenticated, updateUser);
//delete
router.delete("/admin/delete/:id", isAuthenticated, Delete);
module.exports = router;