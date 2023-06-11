const express = require('express');
const app = express();
const server = require('http').createServer(app);

const SocketService = require('./socket_service');
const RedisService = require('./redis_service');
const redisService = new RedisService();

const { createClient } = require('redis');

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
const pubClient = createClient(redis_url);
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()])
	.then(() => {
		const socketService = new SocketService(pubClient, subClient);

		const io = socketService.getIOInstance();

		io.on('connection', (socket) => {
			console.log('A user connected');

			socket.on('disconnect', () => {
				console.log(`a user with SocketID ${socket.id} connected`);
				socket.on('disconnect', () => console.log('user disconnected'));

				socket.on('chat message', (msg) => console.log('message: ' + msg));
			});
		});

		// Start the server
		const PORT = process.env.PORT || 3000;
		server.listen(port, () => {
			console.log(`Listening on PORT: ${PORT}, PID: ${process.pid}`);
		});
	})
	.cath((err) => {
		console.error(err);
		process.exit(1);
	});
