
const { getClient } = require('../utils/mongo');
let User = require('../models/user');

async function createUser(user) {
    const client = getClient();
    User = {email: user.email, password: user.hashedPassword, role: user.role};
    try {
        const db = client.db('printability');
        const col = db.collection('users');
        //add timsstamp to the printJobData that human can read
        User.created_at = new Date();
        const result = await col.insertOne(User);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating User:', error);
        throw error;
    } 
}

async function getUser(email) {
    const client = getClient();
    try {
        const db = client.db('printability');
        const col = db.collection('users');
        const user = await col.findOne({ email: email });
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    } 
}

async function isUserExist(email) {
    const client = getClient();
    try {
        const db = client.db('printability');
        const col = db.collection('users');
        const user = await col.findOne({ email: email });
        return user !== null;
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}

async function saveRefreshToken(email, refreshToken) {
    const client = getClient();
    try {
        const db = client.db('printability');
        const col = db.collection('users');
        await col.updateOne({ email: email }, { $set: { refreshToken: refreshToken } });
    } catch (error) {
        console.error('Error saving refresh token:', error);
        throw error;
    }
}

async function getUserByRefreshToken(refreshToken) {
    const client = getClient();
    try {
        const db = client.db('printability');
        const col = db.collection('users');
        const user = await col.findOne({ refreshToken: refreshToken });
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}


module.exports = { createUser, getUser, isUserExist, saveRefreshToken, getUserByRefreshToken };