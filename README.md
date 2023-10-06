# Northcoders News API

This project is an example of a fully working example of a backend service for a mock news website.
The database is PSQL and can be interacted with using node-postgres.

Link to hosted version: https://nc-news-q2aj.onrender.com

You can clone the repo over at https://github.com/rushRobBlob/be-nc-news

Use 'npm install' to install all dependencies (make sure to separately install the dev-dependencies!)

In order to successfully create the nc_news and nc_news_test databases, please create two .env files (.env.development & .env.test) and then input the following into each:

////PUT THIS INTO .end.development
PGDATABASE=nc_news

/////PUT THIS INTO .end.test
PGDATABASE=nc_news_test

After this you should be able to use 'npm run setup-dbs' and 'npm run seed' to create and populate the databases.


