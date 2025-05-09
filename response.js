const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        
            payload: {
                status_Code : statusCode,
                datas : data,
                message: message
            },
            pagination:{
                prev:"",
                next:"",
                current:""
            }

        })
    }        
    


module.exports = response