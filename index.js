import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
const upload = multer();

const PORT = 3002;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

const db = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: '123456',
  database: 'db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

app.get('/cliente/buscar/id/:id', (req, res) => {
  const id = Number(req.params.id);
  const sql = 'SELECT * FROM clientes WHERE idclientes =' + id;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.json(result);
  })
});

app.listen(PORT, () => {
  console.log('Server is running on port 3002.')
});