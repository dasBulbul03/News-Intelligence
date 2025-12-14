const { Worker } = require('bullmq');
const { REDIS_URL } = require('../config');
const { processIngestion } = require('../services/ingestionService');

const worker = new Worker('ingestion', processIngestion, { connection: REDIS_URL });

worker.on('completed', (job) => {
    console.log(`Ingestion job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.error(`Ingestion job ${job.id} failed: ${err.message}`);
});

module.exports = worker;