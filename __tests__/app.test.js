const app = require('../app.js')
const request = require('supertest');
const seed = require('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const db = require('../db/connection.js')

beforeEach(() => {
    return seed(data);
})
afterAll(() => db.end());


describe('general errors', () => {
    test('should respond with a 404 error message when dealing with an invalid endpoint name', () => {
        return request(app).get('/api/whatever').expect(404).then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe('Invalid request!');
        })
    })
})

describe('GET /api', () => {
    test('responds with an object describing all the available endpoints', () => {
        return request(app).get('/api').expect(200).then(({ body }) => {
            const endPoints = body.endpoints;
            for (const key in endPoints) {
                expect(endPoints[key].hasOwnProperty('description')).toBe(true);
            }
            expect(typeof endPoints).toBe('object');
        })
    })
})



describe.only('GET /api/topics', () => {
    test('responds with an array of topic objects containing the correct properties', () => {
        return request(app).get('/api/topics').expect(200).then(({ body: topics }) => {
            expect(topics.length).toBe(3);
            topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true);
                expect(topic.hasOwnProperty('description')).toBe(true);
            })
        })
    })
})







