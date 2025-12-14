const express = require('express');
const router = express.Router();
const { ingestNews } = require('../controllers/ingestController');

/**
 * @swagger
 * /ingest:
 *   post:
 *     summary: Ingest news articles
 *     responses:
 *       200:
 *         description: Ingestion started
 */
router.post('/', ingestNews);

module.exports = router;