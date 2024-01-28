const jwt = require("jsonwebtoken");
const User = require ("../models/userModel");
const bcrypt = require('bcrypt');

exports.createAUser = async (req, res) => {
    const saltRounds = process.env.SALT;
    const salt = await bcrypt.genSalt(saltRounds);

    const newUserData = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        role: req.body.role
    }
    const newUser = new User(newUserData);

    try {
        const user = await newUser.save();
        res.status(201);
        res.json(user);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(500).json({message: "utilisateur non trouvé"});
            return;
        }
        if(user.email === req.body.email && await bcrypt.compare(req.body.password, user.password)) {
            const userData = {
                id: user._id,
                email: user.email,
                role: user.role,
            };

            const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "30 days"});
            res.status(200).json({token});
        } else {
            res.status(401).json({message: "Email ou mdp incorrect"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Une erreur s'est prduite lors du traitement"})
    }
}

exports.listAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200);
        res.json(users);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message : "erreur serveur"})
    }
}


exports.getAUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200);
            res.json(user);
        } else {
            res.status(404);
            res.json({ message: "User non trouvé" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.editAUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (updatedUser) {
            res.status(200);
            res.json(updatedUser);
        } else {
            res.status(404);
            res.json({ message: "User non trouvé" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.deleteAUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await User.deleteOne({"_id": userId});
        if (deletedUser) {
            res.status(200);
            res.json({ message: "User supprimé avec succès" });
        } else {
            res.status(404);
            res.json({ message: "User non trouvé" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}