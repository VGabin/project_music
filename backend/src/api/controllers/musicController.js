const Music = require ('../models/musicModel');
const Session = require('../models/sessionModel');

exports.listAllMusics = async (req, res) => {
    try {
        const sessionId = req.params.sessionId;

        // Vérifier si la session existe
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "La session n'a pas été trouvé." });
        }

        const musics = await Music.find({ session: sessionId });
        res.status(200);
        res.json(musics);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.createAMusic = async (req, res) => {
    const {link, title, cover} = req.body;
    const sessionId = req.params.sessionId;

    // Vérifier si les paramètres requis sont présents
    if (!link || !sessionId) {
        return res.status(400).json({ message: "Les paramètres 'link', 'title' et 'sessionId' sont obligatoires." });
    }

    const newMusic = new Music({
        link,
        title,
        cover,
        session: sessionId
    });

    try {
        const music = await newMusic.save();
        res.status(201);
        res.json(music);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' })
    }
}


exports.getAMusic = async (req, res) => {
    const musicId = req.params.musicId;
    try {
        const music = await Music.findById(musicId);
        if (music) {
            res.status(200);
            res.json(music);
        } else {
            res.status(404);
            res.json({ message: 'Music non trouvé' });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}

exports.deleteAMusic = async (req, res) => {
    const musicId = req.params.musicId;
    try {
        const deletedMusic = await Music.deleteOne({"_id": musicId});
        if (deletedMusic) {
            res.status(200);
            res.json({ message: 'Music supprimé avec succès' });
        } else {
            res.status(404);
            res.json({ message: 'Music non trouvé' });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}
