const VoteController = require('../controllers/voteController');
const Vote = require('../models/voteModel');
const Music = require('../models/musicModel');

beforeEach(() => {
    jest.mock('../models/voteModel');
});

describe('listAllVotes', () => {
    test('devrait renvoyer une liste de musique avec le statut 200 et non nulle si la musique existe', async () => {
        jest.spyOn(Music, 'findById').mockResolvedValue({
            _id: '123456',
            title: 'musicTitle',
            link: 'https://www.youtube.com/watch?v=na6bysYNuS0'
        });

        jest.spyOn(Vote, 'find').mockResolvedValue([
            {
                rating: 4,
                userId: 'userId1',
            },
            {
                rating: 3,
                userId: 'userId2',
            },
        ]);

        const req = {
            params: {
                musicId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await VoteController.listAllVotes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });

    test('devrait renvoyer une réponse avec le statut 404 si la musique n\'existe pas', async () => {
        jest.spyOn(Music, 'findById').mockResolvedValue(null);

        const req = {
            params: {
                musicId: '123456'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await VoteController.listAllVotes(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).not.toBeNull();
    });
});

describe('createAVote', () => {
    test('devrait renvoyer un vote avec le statut 201 et non nul', async () => {
        jest.spyOn(Vote.prototype, 'save').mockResolvedValue();

        const req = {
            params: {
                musicId: '123456'
            },
            body: {
                rating: 3,
                userId: 'userId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await VoteController.createAVote(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).not.toBeNull();
    });
});

describe('createAVote corps vide', () => {
    test('devrait renvoyer un vote avec le statut 400 et non nul', async () => {
        jest.spyOn(Vote.prototype, 'save').mockResolvedValue();

        const req = {
            params: {
                musicId: '123456'
            },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await VoteController.createAVote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).not.toBeNull();
    });
});

describe('getAVote', () => {
    test('devrait renvoyer un vote avec le statut 200 et non nul', async () => {
        jest.spyOn(Vote, 'findById').mockResolvedValue({
            rating: 3,
            userId: 'userId',
            _id: 'voteId'
        });

        const req = {
            params: {
                voteId: 'voteId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await VoteController.getAVote(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});

describe('getAVote échec', () => {
    test('devrait renvoyer un vote avec le statut 404 et non nul', async () => {
        jest.spyOn(Vote, 'findById').mockResolvedValue();

        const req = {
            params: {
                voteId: 'voteId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await VoteController.getAVote(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).not.toBeNull();
    });
});

describe('deleteAVote', () => {
    test('devrait renvoyer un vote avec le statut 200 et non nul', async () => {
        const req = {
            params: {
                voteId: 'voteId'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Supposons que l'opération de suppression réussisse
        jest.spyOn(Vote, 'deleteOne').mockResolvedValue({
            _id: 'voteId'
        });

        await VoteController.deleteAVote(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).not.toBeNull();
    });
});
