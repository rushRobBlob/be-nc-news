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

describe('/api/topics', () => {
    test('GET:200 responds with an array of topic objects containing the correct properties', () => {
        return request(app).get('/api/topics').expect(200).then(({ body: topics }) => {

            expect(topics.length).toBe(3);
            topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true);
                expect(topic.hasOwnProperty('description')).toBe(true);
            })
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

describe('GET /api/articles/:article_id', () => {
    test('200: responds with an article object with the correct properties when given a valid id that exists', () => {
        return request(app).get('/api/articles/4').expect(200).then(({ body }) => {
            const { articles: article } = body;
            const articleProperties = ['author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'article_img_url']
            articleProperties.forEach((articleProperty) => {
                expect(article[0].hasOwnProperty(articleProperty));
            })

        })
    })
    test('404: responds with an appropriate status and error message when given a valid id that does not exist', () => {
        return request(app).get('/api/articles/9999').expect(404).then(({ body }) => {
            expect(body.msg).toBe('Article does not exist!');

        })
    })
    test('400: responds with an appropriate status and error message when given an invalid id', () => {
        return request(app).get('/api/articles/not-valid').expect(400).then(({ body }) => {
            expect(body.msg).toBe('Invalid article ID');
        })
    })
})