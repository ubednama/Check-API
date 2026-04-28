const express = require('express');
const helmet = require('helmet');

const app = express();

const PORT = process.env.PORT || 3005;

app.use(helmet());

app.get(['/', '/health'], (req, res) => {
    res.set('Cache-Control', 'no-store');
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
process.on('unhandledRejection', (err) => console.error('unhandledRejection', err));
process.on('uncaughtException', (err) => console.error('uncaughtException', err));
