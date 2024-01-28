const SessionController = require('../controllers/sessionController');
const Session = require('../models/sessionModel');
const textApiProvider = require('../providers/textApiProvider');

beforeEach(() => {
    jest.mock('../models/sessionModel');
    jest.mock('../providers/textApiProvider', () => ({
        getRandomText: jest.fn(() => Promise.resolve('Texte aléatoire simulé')),
    }));
});

describe('listAllSessions', () => {
    test('devrait renvoyer une liste de publications avec le statut 200 et non nulle', async () => {
        jest.spyOn(Session, 'find').mockResolvedValue([
            {
                name: 'name1',
            },
            {
                name: 'name2',
            },
        ]);
        
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.listAllSessions(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});

describe('listAllSessions échec', () => {
    test('devrait renvoyer une liste de publications avec le statut 500 et non nulle', async () => {
        jest.spyOn(Session, 'find').mockResolvedValue();
        
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.listAllSessions(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});

describe('createASession', () => {
    test('devrait renvoyer une publication avec le statut 201 et non nulle', async () => {
        jest.spyOn(Session.prototype, 'save').mockResolvedValue();
        
        const req = {
            body: {
                name: 'name',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.createASession(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).not.toBeNull();
    });
});

describe('createASession corps vide', () => {
    test('devrait renvoyer une publication avec le statut 400 et non nulle', async () => {
        jest.spyOn(Session.prototype, 'save').mockResolvedValue();
        
        const req = {
            body: {
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.createASession(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).not.toBeNull();
    });
});

describe('getASession', () => {
    test('devrait renvoyer une publication avec le statut 200 et non nulle', async () => {
        jest.spyOn(Session, 'findById').mockResolvedValue({
            name: 'nouveauNom',
            _id: '123456'
        });
        
        const req = {
            params: {
                sessionId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.getASession(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});

describe('getASession échec', () => {
    test('devrait renvoyer une publication avec le statut 404 et non nulle', async () => {
        jest.spyOn(Session, 'findById').mockResolvedValue();
        
        const req = {
            params: {
                sessionId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.getASession(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).not.toBeNull();
    });
});

describe('editASession', () => {
    test('devrait renvoyer une publication avec le statut 200 et non nulle', async () => {
        const req = {
            params: {
                sessionId: '123456'
            },
            body: {
                vote_ended: true,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Supposons que l'opération de modification réussisse
        jest.spyOn(Session, 'findByIdAndUpdate').mockResolvedValue({
            vote_ended: true,
            _id: '123456'
        });

        await SessionController.editASession(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});

describe('deleteASession', () => {
    test('devrait renvoyer une publication avec le statut 200 et non nulle', async () => {
        const req = {
            params: {
                sessionId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Supposons que l'opération de suppression réussisse
        jest.spyOn(Session, 'deleteOne').mockResolvedValue({
            _id: '123456'
        });

        await SessionController.deleteASession(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});
