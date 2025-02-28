import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


// Register user
export const regUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {

        // Find user by email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password,
            isAdmin,
        });

        await newUser.save();

        res.json({ msg: 'User registered succesfully' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });

    }
}

// login user 

export const logUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid Username or password' });

        //    check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid Username or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: user._id, username: user.name })
    } catch (error) {
        res.status(500).json({ error: "❌ Server error" });
    }
}


