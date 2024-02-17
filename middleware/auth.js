const jwt = require('jsonwebtoken')


const auth = async ( req, res, next) => {

    try{

//postmande Headers kısmına authorization adında key aç ve tokenı yapıştır
        const token = req.headers.authorization



        let decodedData;

        if(token){
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN)

            req.userId = decodedData?.id
        }
        else{
           /* decodedData = jwt.decode(token)

            req.userId = decodedData?.sub*/

            res.status(500).json({
                message: "User not auth"
            })


            return;
        }

        next()
    }
    catch(error){
        console.log(error)
    }
}


module.exports = auth;