import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import { User } from './schema/user';
import { UserController } from './controller/userController';

const app = express();
const port = 6886;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ControllerForUser = new UserController();

mongoose.connect('mongodb://localhost:27017/chat', { useUnifiedTopology: true, useCreateIndex: true });

app.get('/user/:id', ControllerForUser.findUser);
app.delete('/user/:id', ControllerForUser.deleteUser);
app.post('/user/create', ControllerForUser.create);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
