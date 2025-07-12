import express from "express";
import fetch from "node-fetch";
import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';

const router = express.Router();

// Description - Register/Update user
// POST /api/users/registerUser
router.route('/registerUser').post( asyncHandler( async (req, res) => {
    console.log(req.body);

    const {name, openId } = req.body;

    if (name && openId) {
        const userExists = await User.findOne({
            openId: openId
        });

        if (userExists && userExists.name !== name) {
            userExists.name = name;
            userExists.openId = openId;

            const updatedUser = await userExists.save();
            res.status(201);

            res.json({
                name: updatedUser.name,
                openId: updatedUser.openId,
                msg: 'success'
            });

            // User exists & name did not change
            res.status(201);
        } else if (userExists) {
            res.status(201);
            res.json({
                msg: 'success'
            });

            // User already exists & name did not change
        } else {
            const user = await User.create({
                name,
                openId
            });

            if (user) {
                res.status(201);
                res.json({
                    _id: user._id,
                    name: user.name,
                    openId: user.openId,
                    msg: 'success'
                });
                // User was created successfully
            } else {
                res.status(400),
                res.json({
                    msg: 'fail'
                });
            throw new Error('Invalid user data');
            };
        }
    } else {
        console.log(req, body);
        res.status(400);
        res.json({ 
            msg: 'fail'
        });
        throw new Error('User data not submitted prperly');
    }

}));


// Description - Retrieve user openId
// POST /api/users/authOpenId
router.route('/authOpenId').post( asyncHandler( async (req, res) => {
    console.log(req.body);

    const { code } = req.body;

    if(code) {
        fetch(`https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APP_ID}&secret=${process.env.APP_SECRET}&js_code=${code}&grant_type=authorization_code`)
        .then(res => res.json())
        .then(json => res.send(json))
        .catch(function(err) {
            console.log(err);
        })
    } else {
        console.log(req.body);
        res.status(400);
        throw new Error('No code submitted');
    }
}))


export default router;