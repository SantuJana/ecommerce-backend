const CustomerModel = require('../../models/user.model')

const list = async (req, res) => {
    const page = req?.query?.page || 1
    const limit = req?.query?.limit || 10
    const search = req?.query?.search || ''
    const date = req?.query?.date || ''
    const status = req?.query?.status || 'all'

    let [customerArray, itemCount] = await Promise.all([ CustomerModel.find({
        $and: [
            {$expr: {
                $regexMatch: {
                    input: { $concat: [ '$firstName', ' ', '$lastName' ] },
                    regex: search,
                    options: 'i',
                }
            }},
            {
                status: {$in: status === 'all' ? ['active', 'inactive'] : [status]}
            }
        ]
        }).skip((page - 1) * limit).limit(limit),
        CustomerModel.find({}).count()
    ])
    res.render('pages/customer/list', {
        customers: customerArray,
        page,
        limit,
        search,
        date,
        status,
        success: req.flash('success'),
        error: req.flash('error')
    })
}

const toggleStatus = async (req, res) => {
    let customer = await CustomerModel.findById(req?.params?.id)
    customer.status = customer.status === 'active' ? 'inactive' : 'active'
    await customer.save()
    res.redirect('../')
}

const deleteCustomer = async (req, res) => {
    console.log('del: ', req?.body?.id);
    // await CustomerModel.findByIdAndDelete(req?.body?.id)
    res.redirect('/admin/customer')
}

module.exports = {
    list,
    toggleStatus,
    deleteCustomer,
}