module.exports = (server) => {
    const musicController = require('../controllers/musicController');
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    /**
     * @swagger
     * tags:
     *   name: Musiques
     *   description: Opérations liées aux musiques
     */

    /**
     * @swagger
     * /sessions/{sessionId}/musics:
     *   parameters:
     *     - name: sessionId
     *       in: path
     *       description: ID de la session
     *       required: true
     *       type: string
     *   get:
     *     summary: Liste tous les musiques d'une session
     *     tags: [Musiques]
     *     responses:
     *       200:
     *         description: Succès de la récupération des musiques
     *       500:
     *         description: Erreur serveur
     *   post:
     *     summary: Crée un nouveau musique pour un session
     *     tags: [Musiques]
     *     security:
     *       - Bearer: []
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Musique
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             title:
     *               type: string
     *             link:
     *               type: string
     *           required:
     *             - title
     *             - link
     *     responses:
     *       201:
     *         description: Musique créé avec succès
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     */

    server.route('/sessions/:sessionId/musics')
          .get(musicController.listAllMusics)
          .post(jwtMiddleware.verifyToken, musicController.createAMusic);

    /**
     * @swagger
     * /musics/{musicId}:
     *   parameters:
     *     - name: musicId
     *       in: path
     *       description: ID de la musique
     *       required: true
     *       type: string
     *   get:
     *     summary: Obtient les détails d'une musique
     *     tags: [Musiques]
     *     responses:
     *       200:
     *         description: Succès de la récupération des détails de la musique
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     *   delete:
     *     summary: Supprime un musique
     *     tags: [Musiques]
     *     security:
     *       - Bearer: []
     *     responses:
     *       204:
     *         description: Musique supprimé avec succès
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite
     *       500:
     *         description: Erreur serveur
     */

    server.route('/musics/:musicId')
          .get(musicController.getAMusic)
          .delete(jwtMiddleware.verifyToken, jwtMiddleware.isAdmin, musicController.deleteAMusic);
}
