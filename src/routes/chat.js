const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/chatController');

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Chat with AI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI response
 */
router.post('/', chatWithAI);

module.exports = router;