// const { Queue } = require('bullmq');
// const { REDIS_URL } = require('../config');

// const ingestionQueue = new Queue('ingestion', { connection: REDIS_URL });

const loadNews = async () => {
    // mock ~50 articles
    return Array.from({ length: 50 }, (_, i) => ({
        title: `News Article ${i+1}`,
        content: `This is the content of news article ${i+1}. It discusses various topics in detail, including politics, economy, and technology. `.repeat(50),
        url: `https://example.com/news/${i+1}`,
        date: new Date().toISOString(),
    }));
};

const chunkText = (text, chunkSize = 500) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
};

const generateEmbedding = async (text) => {
    // mock embedding
    return Array.from({ length: 384 }, () => Math.random());
};

const storeInQdrant = async (embedding, metadata) => {
    // mock store
    console.log('Mock stored in Qdrant:', metadata.title);
};

const processIngestion = async (job) => {
    const news = await loadNews();
    for (const article of news) {
        const chunks = chunkText(article.content);
        for (const chunk of chunks) {
            const embedding = await generateEmbedding(chunk);
            await storeInQdrant(embedding, { ...article, chunk });
        }
    }
};

const addIngestionJob = async () => {
    console.log('Starting mock ingestion');
    await processIngestion({});
    console.log('Ingestion completed');
};

module.exports = { addIngestionJob, processIngestion };