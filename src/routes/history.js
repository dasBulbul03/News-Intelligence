const express = require('express');
const router = express.Router();
const { getHistory, deleteHistory } = require('../controllers/historyController');

/**
 * @swagger
 * /history/{sessionId}:
 *   get:
 *     summary: Get chat history
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History retrieved
 *   delete:
 *     summary: Delete chat history
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History deleted
 */

router.get('/:sessionId', getHistory);
router.delete('/:sessionId', deleteHistory);

module.exports = router;