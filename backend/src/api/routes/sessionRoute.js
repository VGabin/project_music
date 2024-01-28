module.exports = (server) => {
    const sessionController = require('../controllers/sessionController');
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    /**
     * @swagger
     * tags:
     *   name: Sessions
     *   description: Opérations liées aux sessions
     */

    /**
     * @swagger
     * /sessions:
     *   get:
     *     summary: Liste tous les sessions
     *     tags: [Sessions]
     *     responses:
     *       200:
     *         description: Succès de la récupération des sessions
     *       500:
     *         description: Erreur serveur
     *   post:
     *     summary: Crée un nouveau session
     *     tags: [Sessions]
     *     security:
     *       - Bearer: []
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Détails d'une nouvelle session
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *           required:
     *             - name
     *     responses:
     *       201:
     *         description: Session créé avec succès
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite
     *       500:
     *         description: Erreur serveur
     */

    server.route('/sessions')
          .get(sessionController.listAllSessions)
          .post(jwtMiddleware.verifyToken, jwtMiddleware.isAdmin, sessionController.createASession);

    /**
     * @swagger
     * /sessions/{sessionId}:
     *   parameters:
     *     - name: sessionId
     *       in: path
     *       description: ID de la session
     *       required: true
     *       type: string
     *   get:
     *     summary: Obtient les détails d'une session
     *     tags: [Sessions]
     *     security:
     *       - Bearer: []
     *     responses:
     *       200:
     *         description: Succès de la récupération des détails de la session
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     *   put:
     *     summary: Permet de modifier si le vote et ouvert ou non
     *     tags: [Sessions]
     *     security:
     *       - Bearer: []
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Détails de la session à modifier
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             vote_ended:
     *               type: boolean
     *           required:
     *             - vote_ended
     *     responses:
     *       200:
     *         description: Succès de la modification de la session
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite
     *       500:
     *         description: Erreur serveur
     *   delete:
     *     summary: Supprime un session
     *     tags: [Sessions]
     *     security:
     *       - Bearer: []
     *     responses:
     *       204:
     *         description: Session supprimée avec succès
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite
     *       500:
     *         description: Erreur serveur
     */

    server.route('/sessions/:sessionId')
          .all(jwtMiddleware.verifyToken)
          .get(sessionController.getASession)
          .put(jwtMiddleware.isAdmin, sessionController.editASession)
          .delete(jwtMiddleware.isAdmin, sessionController.deleteASession);
}
