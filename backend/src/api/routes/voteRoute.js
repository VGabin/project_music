module.exports = (server) => {
    const voteController = require('../controllers/voteController');
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    /**
     * @swagger
     * tags:
     *   name: Votes
     *   description: Opérations liées aux votes
     */

    /**
     * @swagger
     * /musics/{musicId}/votes:
     *   parameters:
     *     - name: musicId
     *       in: path
     *       description: ID de la musique
     *       required: true
     *       type: string
     *   get:
     *     summary: Liste tous les votes d'une musique
     *     tags: [Votes]
     *     responses:
     *       200:
     *         description: Succès de la récupération des votes
     *       500:
     *         description: Erreur serveur
     *   post:
     *     summary: Crée un nouveau musique pour une musique
     *     tags: [Votes]
     *     security:
     *       - Bearer: []
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Vote
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             rating:
     *               type: number
     *             userId:
     *               type: string
     *           required:
     *             - rating
     *             - musicId
     *             - userId
     *     responses:
     *       201:
     *         description: Vote créé avec succès
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     */

    server.route('/musics/:musicId/votes')
          .get(voteController.listAllVotes)
          .post(jwtMiddleware.verifyToken, voteController.createAVote);

    /**
     * @swagger
     * /votes/{voteId}:
     *   parameters:
     *     - name: voteId
     *       in: path
     *       description: ID du vote
     *       required: true
     *       type: string
     *   get:
     *     summary: Obtient les détails d'un vote
     *     tags: [Votes]
     *     responses:
     *       200:
     *         description: Succès de la récupération des détails du vote
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     *   put:
     *     summary: Modifie le contenu d'un vote
     *     tags: [Votes]
     *     security:
     *       - Bearer: []
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Détails du vote à modifier
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             rating:
     *               type: number
     *           required:
     *             - rating
     *     responses:
     *       200:
     *         description: Succès de la modification du vote
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite
     *       500:
     *         description: Erreur serveur
     *   delete:
     *     summary: Supprime un musique
     *     tags: [Votes]
     *     security:
     *       - Bearer: []
     *     responses:
     *       204:
     *         description: Vote supprimé avec succès
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite
     *       500:
     *         description: Erreur serveur
     */

    server.route('/votes/:voteId')
          .get(voteController.getAVote)
          .put(jwtMiddleware.verifyToken, jwtMiddleware.isAdmin, voteController.editAVote)
          .delete(jwtMiddleware.verifyToken, jwtMiddleware.isAdmin, voteController.deleteAVote);
}
