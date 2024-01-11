const handleError = (error, req, res, next) => {
    console.log(error);
    res.send({
        success: false,
        error: {
            message: error.message,
        }
    });
}

module.exports = handleError;