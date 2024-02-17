const Auth = require('../models/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const user = await Auth.findOne({email});


        if(user){
            return res.status(500).json({message: "This email already has an account"})
        }

        if(password.length<6){
            return res.status(500).json({message: "Password must have at least 6 characters"})

        }


        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await Auth.create({username, email, password: passwordHash});

        const userToken = await jwt.sign(
            {id: newUser.id},
             process.env.SECRET_TOKEN,
             {expiresIn: '1h'}
             )

            
        res.status(201).json({
            status: "OK",
            newUser,
            userToken
        })

    }catch(error){
        return res.status(500).json({message: error.message})

    }
}


const login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await Auth.findOne({email});

        if(!user){
            return res.status(500).json({message: "This mail address does not has an account"})
        }


        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(500).json({message: "Wrong password"})

        }

        const userToken = await jwt.sign(
            {id: user.id},
             process.env.SECRET_TOKEN,
             {expiresIn: '1h'}
             )

        res.status(200).json({
            status: 'OK',
            user,
            userToken
        })





    }catch(error){
        return res.status(500).json({message: error.message})

    }
}





module.exports = {
    register,
    login
}