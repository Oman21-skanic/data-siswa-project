const response = (statusCode, datas, message, res) => {
    res.status(statusCode).json({
        datas,
        message,
        metadata: {
            prev: "",
            next: "",
            max: "",
            min: ""
        }
    });
}

module.exports = response;
