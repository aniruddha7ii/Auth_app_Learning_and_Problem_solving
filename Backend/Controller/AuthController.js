import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from './../Models/userModels';
import { cookieParser } from 'cookie-parser';

export const register = async (req, res) => {

    // collect user details from body persar (json data)
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all the details." });
    }

    try {

        // check if that email is already exist or not.
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ success: false, message: "Email is already exist." });
        }

        const hashedPassword = await bcrypt.hash(password, 10) // grater number more security but it will take more time to encript the password.
        // same as above
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(password, salt);

        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // res.status(201).json({success:true,message:"User registered successfully.", token});
        // i will send token in cookie so that it will be more secure and it will be automatically sent in every request.
        return res
            .cookie('utoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'dev',
                sameSite: process.env.NODE_ENV === 'dev' ? 'strict' : 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({success:true, message: "Registration successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// login user
export const login = async (req, res) => {

    // collect user details from body persar (json data)
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all the details." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email, No user found." });
        }

        // now compare the password and chack validation
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // res.status(200).json({success:true,message:"User logged in successfully.",token});
        return res
            .cookie('utoken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'dev',
                sameSite: process.env.NODE_ENV === 'dev' ? 'strict' : 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({success:true, message: "Login successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// logout user
export const logout = async (req,res)=>{
    try{
        res.clearCookie('utoken',{
            httpOnly: true,
                secure: process.env.NODE_ENV !== 'dev',
                sameSite: process.env.NODE_ENV === 'dev' ? 'strict' : 'none'
        });

        return res.status(200).json({success:true, message: "Logout successful" });

    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}