const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API is running...'));

const port = 2000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`))