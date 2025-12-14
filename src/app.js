const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// routes
const ingestRoutes = require('./routes/ingest');
const chatRoutes = require('./routes/chat');
const historyRoutes = require('./routes/history');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'News Intelligence RAG API',
            version: '1.0.0',
            description: 'API for news intelligence with RAG',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // files containing annotations
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'News Intelligence RAG API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            docs: '/api-docs',
            ingest: '/ingest',
            chat: '/chat',
            history: '/history'
        }
    });
});

// routes
app.use('/ingest', ingestRoutes);
app.use('/chat', chatRoutes);
app.use('/history', historyRoutes);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;