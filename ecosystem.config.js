module.exports = {
    apps: [
        {
            name: 'check-api',
            script: 'index.js',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3005,
            },
            max_restarts: 10,
            restart_delay: 5000,
        },
    ],
};
