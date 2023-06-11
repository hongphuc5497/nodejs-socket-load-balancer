const socketIO = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');

class SocketService {
	constructor(pubClient, subClient) {
		this.io = socketIO();
		this.io.adapter(
			redisAdapter({
				pubClient,
				subClient,
			})
		);
	}

	initialize(server) {
		this.io.attach(server);
	}

	getIOInstance() {
		return this.io;
	}
}

module.exports = SocketService;
const { Server } = require('socket.io');
const { createClient } = require('redis');

const io = new Server();
const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
	io.adapter(createAdapter(pubClient, subClient));
	io.listen(3000);
});
