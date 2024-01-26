const moment = require('moment')

const auth = (req, res, next) => {
    const admin = req?.session?.admin
    if (admin){
        req.session.lastActivityTime = Date.now()
        req.admin = admin 
        res.locals.name = admin.name
        res.locals.email = admin.email
        res.locals.profileImage = admin.profileImage
        res.locals.moment = moment
        next();
    } else {
        res.redirect('/admin/auth/signin')
    }
}

module.exports = auth;