const { getInteractions, deleteInteractions } = require('../repositories/interactionRepository');

const getHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const history = await getInteractions(sessionId);
        res.json({ history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        await deleteInteractions(sessionId);
        res.json({ message: 'History deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getHistory, deleteHistory };