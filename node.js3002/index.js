import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import dotenv from "dotenv"
const upload = multer();
dotenv.config()

const PORT = 3002;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

function conectar() {
  const db = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`
  });

  return db
}

app.post('/cliente/gravar', (req, res) => {
  const db = conectar()

  const sql = 'INSERT INTO cliente (nome, telefone, email, idtipo_cliente, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
  const variables = [req.body.nome, req.body.telefone, req.body.email, req.body.idtipo_cliente, req.body.cep, req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.uf];
  db.query(sql, variables, (err) => {
    if (err) {

      return res.status(501).send([{ data: "Erro ao cadastar", status: 501, statusmessage: err.message }])
    }

    res.status(200).send([{ data: "Cadastro criado com sucesso",  status: 200 }])
  })

  db.end()

});

app.listen(PORT, () => {
  console.log('Server is running on port 3002.')
});
