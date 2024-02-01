const dashboard = (req, res, next) => {
    res.render("pages/index", {
        success: req.flash("success"),
        error: req.flash("error"),
    });
};

module.exports = {
    dashboard,
};
