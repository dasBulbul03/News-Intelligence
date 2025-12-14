const app = require('./app');
const { PORT } = require('./config');
const logger = require('./utils/logger');
const { execSync } = require('child_process');

// Utility function to check and kill process on port
const killProcessOnPort = (port) => {
    try {
        if (process.platform === 'win32') {
            const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
            const lines = result.trim().split('\n').filter(line => line.includes('LISTENING'));
            if (lines.length > 0) {
                const pid = lines[0].trim().split(/\s+/).pop();
                try {
                    execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
                    console.log(`✅ Killed process ${pid} on port ${port}`);
                    return true;
                } catch (killErr) {
                    return false;
                }
            }
        }
        return false;
    } catch (err) {
        return false;
    }
};

// start worker
// require('./jobs/ingestionJob');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    console.error('❌ Uncaught Exception:', err.message);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    console.error('❌ Unhandled Rejection:', reason);
    process.exit(1);
});

// Check and free port before starting
const portFreed = killProcessOnPort(PORT);
if (portFreed) {
    // Wait a moment for port to be released
    const startTime = Date.now();
    while (Date.now() - startTime < 2000) {
        // Busy wait to ensure port is released
    }
}

const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`\n✅ Server is running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
    console.log(`🏠 Root: http://localhost:${PORT}/\n`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use`);
        console.error(`\n❌ Port ${PORT} is already in use.`);
        console.error(`   The startup script should have handled this, but if the error persists:`);
        console.error(`   Run: Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess | Stop-Process`);
        process.exit(1);
    } else {
        logger.error(`Server error: ${err.message}`);
        console.error(`❌ Failed to start server: ${err.message}`);
        process.exit(1);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
});