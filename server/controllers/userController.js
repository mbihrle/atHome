import asyncHandler from 'express-async-handler';
import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const saltRounds = 10;

const matchPassword = async function (enteredPassword, hash) {
    return await bcrypt.compare(enteredPassword, hash);
};

const hashPassword = async function (password) {
    return await bcrypt.hash(password, saltRounds);
};

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email: enteredEmail, password: enteredPassword } = req.body;

    const [user] = await db
        .select('*')
        .from('users')
        .where({ email: enteredEmail });

    const {
        user_id,
        email,
        hash,
        username,
        firstname,
        lastname,
        middlename,
        role,
        active,
        deleted,
    } = user;

    if (user && (await matchPassword(enteredPassword, hash))) {
        res.json({
            user_id,
            email,
            username,
            firstname,
            lastname,
            middlename,
            role,
            active,
            deleted,
            token: generateToken(user_id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Register a new user
// @route POST/api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const [userExists] = await db.select('*').from('users').where({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hash = await hashPassword(password);
    console.log('hash: ', hash);
    const [user] = await db
        .insert({
            username,
            email,
            hash,
        })
        .into('users')
        .returning('*');

    if (user) {
        // attach token to user
        user.token = generateToken(user.user_id);
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user_id_from_token = req.user[0].user_id;
    // console.log('zzz: ', req.user);

    const [user] = await db
        .select('*')
        .from('users')
        .where({ user_id: user_id_from_token });

    const {
        user_id,
        email,
        username,
        firstname,
        lastname,
        middlename,
        role,
        active,
        deleted,
    } = user;

    if (user) {
        res.json({
            user_id,
            email,
            username,
            firstname,
            lastname,
            middlename,
            role,
            active,
            deleted,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, registerUser, getUserProfile };
