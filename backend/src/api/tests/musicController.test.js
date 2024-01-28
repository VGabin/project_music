const MusicController = require('../controllers/musicController');
const Music = require('../models/musicModel');
const Session = require('../models/sessionModel');

beforeEach(() => {
    jest.mock('../models/musicModel');
});

describe('listAllMusics', () => {
    test('devrait renvoyer une liste de musique avec le statut 200 et non nulle si le session existe', async () => {
        jest.spyOn(Session, 'findById').mockResolvedValue({
            _id: '123456',
            title: 'sessionTitle',
            content: 'sessionContent'
        });

        jest.spyOn(Music, 'find').mockResolvedValue([
            {
                title: 'user1',
                link: 'music1',
            },
            {
                title: 'user2',
                link: 'music2',
            },
        ]);

        const req = {
            params: {
                sessionId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.listAllMusics(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });

    test('devrait renvoyer une réponse avec le statut 404 si le session n\'existe pas', async () => {
        jest.spyOn(Session, 'findById').mockResolvedValue(null);

        const req = {
            params: {
                sessionId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.listAllMusics(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).not.toBeNull();
    });
});

describe('createAMusic', () => {
    test('devrait renvoyer un musicaire avec le statut 201 et non nul', async () => {
        jest.spyOn(Music.prototype, 'save').mockResolvedValue();

        const req = {
            params: {
                sessionId: '123456'
            },
            body: {
                title: 'userName',
                link: 'userMessage'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.createAMusic(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).not.toBeNull();
    });
});

describe('createAMusic corps vide', () => {
    test('devrait renvoyer un musicaire avec le statut 400 et non nul', async () => {
        jest.spyOn(Music.prototype, 'save').mockResolvedValue();

        const req = {
            params: {
                sessionId: '123456'
            },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.createAMusic(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).not.toBeNull();
    });
});

describe('getAMusic', () => {
    test('devrait renvoyer un musicaire avec le statut 200 et non nul', async () => {
        jest.spyOn(Music, 'findById').mockResolvedValue({
            title: 'userName',
            link: 'userMessage',
            _id: 'musicId'
        });

        const req = {
            params: {
                musicId: 'musicId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.getAMusic(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});

describe('getAMusic échec', () => {
    test('devrait renvoyer un musicaire avec le statut 404 et non nul', async () => {
        jest.spyOn(Music, 'findById').mockResolvedValue();

        const req = {
            params: {
                musicId: 'musicId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.getAMusic(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).not.toBeNull();
    });
});

describe('deleteAMusic', () => {
    test('devrait renvoyer un musicaire avec le statut 200 et non nul', async () => {
        const req = {
            params: {
                musicId: 'musicId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Supposons que l'opération de suppression réussisse
        jest.spyOn(Music, 'deleteOne').mockResolvedValue({
            _id: 'musicId'
        });

        await MusicController.deleteAMusic(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});
