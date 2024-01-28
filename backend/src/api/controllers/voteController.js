const Vote = require ('../models/voteModel');
const Music = require ('../models/musicModel');

exports.listAllVotes = async (req, res) => {
    try {
        const musicId = req.params.musicId;

        // Vérifier si la musique existe
        const music = await Music.findById(musicId);
        if (!music) {
            return res.status(404).json({ message: "La musique n'a pas été trouvé." });
        }

        const votes = await Vote.find({ music: musicId });
        res.status(200);
        res.json(votes);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur" });
    }
}

exports.createAVote = async (req, res) => {
    const rating = req.body.rating;
    const userId = req.body.userId;
    const musicId = req.params.musicId;

    if (!rating || !musicId|| !userId) {
        return res.status(400).json({ message: "Les paramètres 'rating', 'userId' et 'musicId' sont obligatoires." });
    }

    const newVote = new Vote({
        rating,
        music: musicId,
        user: userId,
    });

    try {
        const vote = await newVote.save();
        res.status(201);
        res.json(vote);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: error })
    }
}

exports.editAVote = async (req, res) => {
    const voteId = req.params.voteId;
    const updatedVoteData = req.body;

    try {
        const updatedVote = await Vote.findByIdAndUpdate(voteId, updatedVoteData, { new: true , runValidators: true});
        if (updatedVote) {
            res.status(200);
            res.json(updatedVote);
        } else {
            res.status(404);
            res.json({ message: 'Vote non trouvé' });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: error });
    }
}


exports.getAVote = async (req, res) => {
    const voteId = req.params.voteId;
    try {
        const vote = await Vote.findById(voteId);
        if (vote) {
            res.status(200);
            res.json(vote);
        } else {
            res.status(404);
            res.json({ message: 'Vote non trouvé' });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}

exports.deleteAVote = async (req, res) => {
    const voteId = req.params.voteId;
    try {
        const deletedVote = await Vote.deleteOne({"_id": voteId});
        if (deletedVote) {
            res.status(200);
            res.json({ message: 'Vote supprimé avec succès' });
        } else {
            res.status(404);
            res.json({ message: 'Vote non trouvé' });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}
