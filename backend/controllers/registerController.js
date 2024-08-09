const userService = require('../services/users_service');


const bcrypt = require('bcrypt');



const handleNewUser = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username and password are required'});
    }

    //check for duplicate username in the database
    const duplicateUser = await userService.isUserExist(username);
    if (duplicateUser) {
        return res.status(409).json({'message': 'Username already exists'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.createUser({username, hashedPassword, role});
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({'message': error.message});
    }

    res.status(201).send('User created');
}

module.exports = { handleNewUser };