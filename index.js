const express = require('express');

const app = express();

const PORT = process.env.PORT || 3005;

app.get(['/', '/health'], (req, res) => {
    return res.json({ message: 'OK' });
});

const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

const shutdown = (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
