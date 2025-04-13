import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import otpUser from "../models/otp.model.js";

export const adminLogin = async (req, res) => {
    try {

        const { email,password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password both required!", status: 400 });
        }

        const adminUser = await Admin.findOne({email: new RegExp(`^${email}$`, 'i')})

        if (!adminUser) {
          return res.status(400).json({ message: "You are not admin please contact developer for credentials!", status: 400})
        }

        if (adminUser.password != password) {
           return res.status(400).json({ message: "Incorrect Password", status: 400});
        }

        const otpuser = await otpUser.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!otpuser) {
            otpuser = new otpUser({ email,undefined,undefined});
        }

        otpuser.isVarified = true
        await otpuser.save();

        let user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

        if (!user) {
            user = new User({ email, undefined, undefined});
            console.log("User created Sucessfully")
        }

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '48h',
        });

        res.status(200).json({
            authToken: token,
            status: 200
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server error", status: 500 });
    }
}