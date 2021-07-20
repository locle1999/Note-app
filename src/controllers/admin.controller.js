const adminCtrl = {};
const User = require('../models/User');
const passport = require('passport');

// adminCtrl.renderAdmin = (req, res) => {
//     res.render('admin/admid');
// }
adminCtrl.renderCreateFrom = (req, res) => {
    res.render('admin/create-user');
}
adminCtrl.renderCreateuser = async(req, res) => {

    let errors = [];
    const { name, email, password, confirm_password, author } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "Passwords do not match." });
    }
    if (password.length < 4) {
        errors.push({ text: "Passwords must be at least 4 characters." });
    }
    if (errors.length > 0) {
        res.render('admin/create-user', {
            errors,
            name,
            email,
            author,
            password,
            confirm_password,
        });
    } else {
        // Look for email coincidence
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash("error_msg", "The Email is already in use.");
            res.redirect("/admin/create-user");
        } else {
            // Saving a New User
            const newUser = new User({ name, email, author, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "You are registered.");
            res.redirect("/admin/admid");
        }
    }
}
adminCtrl.renderAdminlist = async(req, res) => {
    const users = await User.find().lean();
    console.log(users);
    res.render("admin/admid", { users });
};
adminCtrl.renderEdit = async(req, res) => {
    const users = await User.findById(req.params.id).lean();
    console.log(req.user.id);
    res.render("admin/edit-user", { users });
}
adminCtrl.updateUser = async(req, res) => {
    const { name, email, password, confirm_password, author } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email, password, confirm_password, author });
    req.flash("success_msg", " Updated Successfully");
    res.redirect("/admin/admid");
}
adminCtrl.Delete = async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Deleted Successfully");
    res.redirect("/admin/admid");
}
module.exports = adminCtrl;