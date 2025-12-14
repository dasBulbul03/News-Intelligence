const { Pool } = require('pg');
const { POSTGRES } = require('../config');

// Create pool only if POSTGRES config is available, otherwise use null
let pool = null;
if (POSTGRES && POSTGRES.host) {
    try {
        pool = new Pool(POSTGRES);
        pool.on('error', (err) => {
            console.error('Unexpected error on idle PostgreSQL client', err);
        });
    } catch (err) {
        console.warn('PostgreSQL connection not available:', err.message);
        pool = null;
    }
} else {
    console.warn('PostgreSQL configuration not found. Database features will be disabled.');
}

const logInteraction = async (sessionId, userQuery, llmResponse, responseTime) => {
    if (!pool) {
        console.warn('Database not available, skipping interaction log');
        return;
    }
    try {
        const query = 'INSERT INTO interactions (session_id, user_query, llm_response, response_time) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [sessionId, userQuery, llmResponse, responseTime]);
    } catch (err) {
        console.error('Error logging interaction:', err.message);
        // Don't throw - allow app to continue without database
    }
};

const getInteractions = async (sessionId) => {
    if (!pool) {
        return [];
    }
    try {
        const query = 'SELECT * FROM interactions WHERE session_id = $1 ORDER BY timestamp DESC';
        const result = await pool.query(query, [sessionId]);
        return result.rows;
    } catch (err) {
        console.error('Error getting interactions:', err.message);
        return [];
    }
};

const deleteInteractions = async (sessionId) => {
    if (!pool) {
        return;
    }
    try {
        const query = 'DELETE FROM interactions WHERE session_id = $1';
        await pool.query(query, [sessionId]);
    } catch (err) {
        console.error('Error deleting interactions:', err.message);
        // Don't throw - allow app to continue
    }
};

module.exports = { logInteraction, getInteractions, deleteInteractions };