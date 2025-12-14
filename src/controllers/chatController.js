const Joi = require('joi');
const { chatService } = require('../services/chatService');

const chatWithAI = async (req, res) => {
    const schema = Joi.object({
        sessionId: Joi.string().required(),
        query: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const { sessionId, query } = req.body;
        const response = await chatService(sessionId, query);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { chatWithAI };