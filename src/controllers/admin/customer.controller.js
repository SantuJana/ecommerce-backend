const CustomerModel = require('../../models/user.model')

const list = async (req, res) => {
    const customers = await CustomerModel.find()
    res.render('pages/customer/list', {
        customers,
        success: req.flash('success'),
        error: req.flash('error')
    })
}

module.exports = {
    list,
}