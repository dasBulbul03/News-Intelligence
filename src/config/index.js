require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    POSTGRES: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    },
    REDIS: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    QDRANT: {
        host: process.env.QDRANT_HOST,
        port: process.env.QDRANT_PORT,
    },
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    REDIS_URL: process.env.REDIS_URL,
};