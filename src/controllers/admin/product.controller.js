const list = async (req, res) => {
    res.render('pages/product/list', {
        success: req.flash('success'),
        error: req.flash('error'),
    });
}

module.exports = {
    list,
}