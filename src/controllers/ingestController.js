const { addIngestionJob } = require('../services/ingestionService');

const ingestNews = async (req, res) => {
    try {
        await addIngestionJob();
        res.json({ message: 'Ingestion started' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { ingestNews };