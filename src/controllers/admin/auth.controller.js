const AdminModel = require('../../models/admin.model')

const view = async (req, res) => {
    return res.render("pages/signin",{
        success: req.flash('success'),
        errors: req.flash('errors'),
    })
}

const signin = async (req, res) => {
    try {
        let { email, password } = req.body
        const admin = await AdminModel.findOne({
            email,
        })
        console.log(admin);
        if (!admin){
            req.flash('errors', 'Credential mismatch')
            return res.redirect('./signin')
        }
        if (await admin.verifyPassword(password)){
            delete admin.password
            req.session.admin = admin
            return res.redirect("../dashboard")
        } else {
            req.flash('errors', 'Credential mismatch')
            res.redirect('./signin')
        }
    } catch (errors) {
        req.flash('errors','Something went wrong')
        return res.redirect('./signin')
    }
}

const signout = async (req, res) => {
    try {
        req.session.admin = null
        res.redirect('/admin/auth/signin')
    } catch (error) {
        
    }
}

module.exports = {
    view,
    signin,
    signout,
}