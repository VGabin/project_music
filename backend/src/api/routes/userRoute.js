module.exports = (server) => {
    const userController = require('../controllers/userController');
    const jwtMiddleware = require("../middlewares/jwtMiddleware");

    /**
     * @swagger
     * tags:
     *   name: Utilisateurs
     *   description: Opérations liées aux utilisateurs
     */

    /**
     * @swagger
     * /users/register:
     *   post:
     *     summary: Enregistrer un nouvel utilisateur
     *     tags: [Utilisateurs]
     *     description: Enregistrer un nouvel utilisateur avec son email, mot de passe et rôle.
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Détails d'inscription de l'utilisateur
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *             password:
     *               type: string
     *             role:
     *               type: string
     *               enum: ["admin", "user"]
     *           required:
     *             - email
     *             - password
     *             - role
     *     responses:
     *       200:
     *         description: Inscription réussie
     *       400:
     *         description: Corps de la requête invalide ou utilisateur déjà existant
     */

    server.post('/users/register', userController.createAUser);

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Connexion d'un utilisateur
     *     tags: [Utilisateurs]
     *     description: Connexion d'un utilisateur avec son email et son mot de passe.
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Détails de connexion de l'utilisateur
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *             password:
     *               type: string
     *           required:
     *             - email
     *             - password
     *     responses:
     *       200:
     *         description: Connecté
     *       400:
     *         description: Corps de la requête invalide ou utilisateur inexistant
     */
    server.post('/users/login', userController.userLogin);

    /**
     * @swagger
     * /users/{userId}:
     *   parameters:
     *     - name: userId
     *       in: path
     *       description: ID de l'utilisateur
     *       required: true
     *       type: string
     *   get:
     *     summary: Obtenir les détails d'un utilisateur
     *     tags: [Utilisateurs]
     *     security:
     *       - Bearer: []
     *     responses:
     *       200:
     *         description: Succès de la récupération des détails de l'utilisateur
     *       401:
     *         description: Non autorisé
     *       500:
     *         description: Erreur serveur
     *   delete:
     *     summary: Supprimer un utilisateur (accès réservé aux administrateurs)
     *     tags: [Utilisateurs]
     *     security:
     *       - Bearer: []
     *     responses:
     *       204:
     *         description: Utilisateur supprimé avec succès
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite (accès réservé aux administrateurs)
     *       500:
     *         description: Erreur serveur
     */
    server.route('/users/:userId')
          .all(jwtMiddleware.verifyToken)
          .get(userController.getAUser)
          .delete(jwtMiddleware.isAdmin, userController.deleteAUser);

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Récupérer tout les utilisateurs (accès réservé aux administrateurs)
     *     tags: [Utilisateurs]
     *     security:
     *       - Bearer: []
     *     responses:
     *       200:
     *         description: Liste des utilisateurs
     *       401:
     *         description: Non autorisé
     *       403:
     *         description: Action interdite (accès réservé aux administrateurs)
     *       500:
     *         description: Erreur serveur
     */
    server.route('/users')
          .all(jwtMiddleware.verifyToken)
          .get(userController.listAllUsers);
}