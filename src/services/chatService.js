const { logInteraction } = require('../repositories/interactionRepository');

const chatService = async (sessionId, query) => {
    const startTime = Date.now();
    // generate embedding for query
    const queryEmbedding = Array.from({ length: 384 }, () => Math.random());
    // search Qdrant
    const searchResult = [{ payload: { chunk: 'This is mock context from news articles.' } }];
    const context = searchResult.map(r => r.payload.chunk).join(' ');
    // build prompt
    const prompt = `You are a helpful AI assistant for news intelligence. Use the following context to answer the user's query.\n\nContext:\n${context}\n\nUser Query: ${query}\n\nAnswer:`;
    // call Gemini
    const response = `Mock AI response to: ${query}. Based on context: ${context}`;
    // log to PostgreSQL
    const responseTime = Date.now() - startTime;
    await logInteraction(sessionId, query, response, responseTime);
    return response;
};

module.exports = { chatService };