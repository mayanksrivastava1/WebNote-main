var jwt = require('jsonwebtoken');

const userFetch =(req,res,next)=>{
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({error: 'please authenticate using a token'})
        return
    }
    try {
    const data = jwt.verify(token,'123456')
    req.user = data
    next()
} catch (error) {
    res.status(401).send({error: 'please authenticate using valid token'}) 
}
}
module.exports = userFetch