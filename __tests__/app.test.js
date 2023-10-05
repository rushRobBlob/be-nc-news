const app = require('../app.js')
const request = require('supertest');
const seed = require('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const db = require('../db/connection.js')
const endpointsJSON = require('../endpoints.json')

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

describe('GET /api/topics', () => {
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


describe('GET /api', () => {
    test('responds with an object describing all the available endpoints', () => {
        return request(app).get('/api').expect(200).then(({ body }) => {
            expect(body.endpoints).toEqual(endpointsJSON);
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('200: responds with an article object with the correct properties when given a valid id that exists', () => {
        return request(app).get('/api/articles/4').expect(200).then(({ body }) => {
            const testArticle = {
                article_id: 4,
                topic: 'mitch',
                votes: 0
            }
            expect(body.article).toMatchObject(testArticle);
            expect(typeof body.article.article_id).toBe('number')
            expect(typeof body.article.title).toBe('string')
            expect(typeof body.article.topic).toBe('string')
            expect(typeof body.article.author).toBe('string')
            expect(typeof body.article.body).toBe('string')
            expect(typeof body.article.created_at).toBe('string')
            expect(typeof body.article.votes).toBe('number')
            expect(typeof body.article.article_img_url).toBe('string')
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


describe('GET /api/articles/:article_id/comments', () => {
    test('200: responds with an array of comments from the corresponding article_id, with each comment containing the correct properties', () => {
        return request(app).get('/api/articles/5/comments').expect(200).then(({ body }) => {
            expect(body.comments).toHaveLength(2);
            const testComment = {
                comment_id: expect.any(Number),
                body: expect.any(String),
                article_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
            }
            body.comments.forEach((comment) => {
                expect(comment).toMatchObject(testComment);
            })
        })
    })
    test('200: should respond with the most recent comment first', () => {
        return request(app).get('/api/articles/5/comments').expect(200).then(({ body }) => {
            expect(body.comments).toBeSortedBy('created_at', { descending: true });
        })
    })
    test('200: should respond with an empty array when the id is valid but there are no comments', () => {
        return request(app).get('/api/articles/4/comments').expect(200).then(({ body }) => {
            expect(body.comments).toEqual([]);
        })
    })
    test('404: responds with an appropriate status and error message when given a valid id that does not exist', () => {
        return request(app).get('/api/articles/9999/comments').expect(404).then(({ body }) => {
            expect(body.msg).toBe('Article does not exist!');

        })
    })
    test('400: responds with an appropriate status and error message when given an invalid id', () => {
        return request(app).get('/api/articles/not-valid/comments').expect(400).then(({ body }) => {
            expect(body.msg).toBe('Invalid article ID');
        })
    })
})

describe('GET /api/articles', () => {
    test('responds with an array of article objects, each with the correct properties', () => {
        return request(app).get('/api/articles').expect(200).then(({ body }) => {
            const testArticle = {
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(String)
            }
            expect(body.articles).toHaveLength(13);
            body.articles.forEach((article) => {
                expect(article).toMatchObject(testArticle);
                expect(article.hasOwnProperty('body')).toBe(false);
            })
        })
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    test('201: responds with the posted comment when username and article_id are valid', () => {
        const newComment = {
            username: 'rogersop',
            comment: 'I really really really like dogs'
        }
        return request(app).post('/api/articles/9/comments').send(newComment).expect(201).then(({ body }) => {
            expect(body.comment).toBe('I really really really like dogs');
        })
    })
    test('201: responds with the posted comment when username and article_id are valid and ignores any unnecessary properties', () => {
        const newComment = {
            username: 'rogersop',
            comment: 'I really really really like dogs',
            ignoreMe: 'heyyyyyyyyyyyy'
        }
        return request(app).post('/api/articles/9/comments').send(newComment).expect(201).then(({ body }) => {
            expect(body.comment).toBe('I really really really like dogs');
        })
    })
    test('401: responds with an error message when username is invalid', () => {
        const newComment = {
            username: 'johnmatrix',
            comment: 'let off some steam, bennett!'
        }
        return request(app).post('/api/articles/9/comments').send(newComment).expect(401).then(({ body }) => {
            expect(body.msg).toBe('Invalid username');
        })
    })
    test('404: responds with an appropriate error message when article_id and username are valid but article does not exist', () => {
        const newComment = {
            username: 'rogersop',
            comment: 'I really really really like errors'
        }
        return request(app).post('/api/articles/9999/comments').send(newComment).expect(404).then(({ body }) => {
            expect(body.msg).toBe('Article not found');
        })
    })
    test('400: responds with an error message when article_id in invalid', () => {
        const newComment = {
            username: 'rogersop',
            comment: 'I really really really like errors'
        }
        return request(app).post('/api/articles/not-valid/comments').send(newComment).expect(400).then(({ body }) => {
            expect(body.msg).toBe('Invalid article ID');
        })
    })
    test('400: responds with an error message when a valid property is missing from the comment body', () => {
        const newComment = {
            comment: 'I really really really like errors'
        }
        return request(app).post('/api/articles/9/comments').send(newComment).expect(400).then(({ body }) => {
            expect(body.msg).toBe('Missing field');
        })
    })
})
