const userService = require('../services/users_service');
const emailService = require('../services/email_service');


const bcrypt = require('bcrypt');



const handleNewUser = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({'message': 'email and password are required'});
    }

    //check for duplicate email in the database
    const duplicateUser = await userService.isUserExist(email);
    if (duplicateUser) {
        return res.status(409).json({'message': 'email already exists'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.createUser({email, hashedPassword, role});
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({'message': error.message});
    }
    emailService.sendEmail(email, '123456');
    res.status(201).send('User created');
}

module.exports = { handleNewUser };