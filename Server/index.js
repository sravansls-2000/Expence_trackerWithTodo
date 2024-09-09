import express from 'express';
import Connection from './database/db.js';
import userRoute from './Routes/userRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import noteRoute from './Routes/noteRoute.js';
import session from 'express-session';
import photoUpload from './Routes/photoUpload.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

const app = express();
const port = process.env.PORT || 8008;

app.use(cors());
app.use(
  session({
    secret: 'your-secret-key', // Change this to a strong, random secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static('public'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`you are running backend successfully on  port ${port}`);
});

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome Todo  API' });
});

app.use('/api/users', userRoute);
app.use('/api/posts', noteRoute);
app.use('/api/upload', photoUpload);
Connection();
