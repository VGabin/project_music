# Projet Music

Bienvenue dans le projet Music ! Ce projet est une application de gestion de sessions musicales où les utilisateurs peuvent ajouter, voter et partager des morceaux de musique.

## Démarrage rapide

Pour lancer l'application, utilisez la commande suivante pour démarrer les conteneurs Docker en mode détaché :

```bash
docker-compose up -d
```

Cela lancera les conteneurs pour le backend, le frontend et la base de données.

## Tests du Backend

Si vous souhaitez exécuter les tests du backend, accédez au conteneur projet-music-backend à l'aide de la commande suivante :

```bash
docker exec -it projet-music-backend bash
```

À l'intérieur du conteneur, exécutez la commande suivante pour lancer les tests :

```bash
npm test
```

## Documentation Swagger

La documentation Swagger pour le backend est accessible sur [localhost:3001/docs](localhost:3001/docs). Utilisez Swagger pour explorer les endpoints de l'API et tester les requêtes.

## Page principale du Frontend

La page principale de l'application frontend est accessible sur [localhost:3000/login](localhost:3000/login). C'est la page de connexion où les utilisateurs peuvent saisir leurs informations d'identification.


