const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send(`Listening on PORT: ${PORT}, PID: ${process.pid}`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}, PID: ${process.pid}`);
});
