import asyncHandler from 'express-async-handler';
import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import knex from 'knex';

const saltRounds = 10;

const matchPassword = async function (enteredPassword, hash) {
    return await bcrypt.compare(enteredPassword, hash);
};

const hashPassword = async function (password) {
    return await bcrypt.hash(password, saltRounds);
};

// @desc Get emails of all users
// @route Get /api/users/
// @access Public

const getAllUserEmails = asyncHandler(async (req, res) => {
    const { id } = req.body;
    // const id = 1;

    try {
        const userEmails = await db
            .select('user_id', 'email')
            .from('users')
            .where({ user_id: id });

        if (userEmails.length > 0) {
            res.json(userEmails);
        } else {
            res.status(404);
            throw new Error('No users found');
        }
    } catch (error) {
        console.error(error);
        res.status(400);
        throw new Error('Request failed');
    }
});

// @desc Auth user & get token = login
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    console.log('XXXXXXXXXXX here: ', req.body);

    const { email: enteredEmail, password: enteredPassword } = req.body;

    try {
        const [login] = await db
            .select('*')
            .from('logins')
            .where({ email: enteredEmail });

        const { user_id, hash } = login;
        if (login && (await matchPassword(enteredPassword, hash))) {
            const [user] = await db
                .select('*')
                .from('users')
                .where({ user_id });
            user.token = generateToken(user_id);
            res.json(user);
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
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
    try {
        const registeredUser = await db.transaction(async (trx) => {
            const [user] = await trx('users')
                .insert({
                    username,
                    email,
                })
                .returning('*');
            await trx('logins').insert({
                user_id: user.user_id,
                hash,
                email,
            });
            return user;
        });
        if (registeredUser) {
            // attach token to user
            registeredUser.token = generateToken(registeredUser.user_id);
            res.status(201).json(registeredUser);
        } else {
            res.status(400);
            throw new Error('Failed to generate token');
        }
    } catch (error) {
        console.error(error);
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user_id_from_token = req.user[0].user_id;
    console.log('xxxx:', user_id_from_token);
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

export { getAllUserEmails, authUser, registerUser, getUserProfile };
