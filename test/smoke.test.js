const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

const PORT = '3999';
const BASE = `http://localhost:${PORT}`;

function startServer() {
    const server = spawn('node', [path.join(__dirname, '..', 'index.js')], {
        env: { ...process.env, PORT },
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    const ready = new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('server start timeout')), 5000);
        server.stdout.on('data', (chunk) => {
            if (chunk.toString().includes('Server started')) {
                clearTimeout(timer);
                resolve();
            }
        });
        server.on('error', reject);
        server.on('exit', (code) => reject(new Error(`server exited ${code}`)));
    });
    return { server, ready };
}

test('GET / and /health return {message: OK}', async (t) => {
    const { server, ready } = startServer();
    t.after(() => new Promise((resolve) => {
        server.once('exit', resolve);
        server.kill('SIGTERM');
    }));
    await ready;

    for (const route of ['/', '/health']) {
        const res = await fetch(`${BASE}${route}`);
        assert.equal(res.status, 200, `status for ${route}`);
        assert.equal(res.headers.get('cache-control'), 'no-store', `cache-control for ${route}`);
        assert.deepEqual(await res.json(), { message: 'OK' }, `body for ${route}`);
    }
});
