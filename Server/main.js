const express = require('express');
const userRouter = require('./Routers/userRouter');

var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

require('./configs/database');

app.use('/api/users', userRouter);

app.listen(8000);
