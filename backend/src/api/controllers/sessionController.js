const Session = require ("../models/sessionModel");

exports.listAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find({});
        res.status(200);
        res.json(sessions);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message : "erreur serveur"})
    }
}

exports.createASession = async (req, res) => {
    const newSession = new Session(req.body);

    if (!newSession.name) {
        return res.status(400).json({ message: "Le nom de la session est obligatoire." });
    }

    try {
        const session = await newSession.save();
        
        res.status(201);
        res.json(session);
    } catch(error) {
        console.log(error);
        res.status(401).json({ message: "Erreur serveur" });
    }

    // try {
    //     const session = await newSession.save();
    //     res.status(201);
    //     res.json(session);
    // } catch (error) {
    //     res.status(500);
    //     console.log(error);
    //     res.json({ message: "Erreur serveur" });
    // }
}


exports.getASession = async (req, res) => {
    const sessionId = req.params.sessionId;
    try {
        const session = await Session.findById(sessionId);
        if (session) {
            res.status(200);
            res.json(session);
        } else {
            res.status(404);
            res.json({ message: "Session non trouvé" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.editASession = async (req, res) => {
    const sessionId = req.params.sessionId;
    const updatedSessionData = req.body;
    try {
        const updatedSession = await Session.findByIdAndUpdate(sessionId, updatedSessionData, { new: true });
        if (updatedSession) {
            res.status(200);
            res.json(updatedSession);
        } else {
            res.status(404);
            res.json({ message: "Session non trouvé" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.deleteASession = async (req, res) => {
    const sessionId = req.params.sessionId;
    try {
        const deletedSession = await Session.deleteOne({"_id": sessionId});
        if (deletedSession) {
            res.status(200);
            res.json({ message: "Session supprimé avec succès" });
        } else {
            res.status(404);
            res.json({ message: "Session non trouvé" });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}
