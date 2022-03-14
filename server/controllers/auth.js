import jwt from 'jsonwebtoken' 
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        console.log(name)
        const existinguser = await users.findOne({ email });
        if(existinguser){
            return res.status(404).json({message: "User Already Exist."})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({name, email, password: hashedPassword})
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET , {expiresIn: '1h'})
        res.status(200).json({result: newUser, token}) //200 => means success

    }catch(error){
        console.log(error)
        res.status(500).json("Something went wrong...") // 500 => means internal server error 
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if(!existinguser){
            return res.status(404).json({message: "User Don't Exist."})
        }

        const isPasswordCorrect = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        const token = jwt.sign({email: existinguser.email, id: existinguser._id}, process.env.JWT_SECRET , {expiresIn: '1h'});
        res.status(200).json({result: existinguser, token})
    } catch (error) {
        res.status(500).json("Something went wrong...")
    }


}
