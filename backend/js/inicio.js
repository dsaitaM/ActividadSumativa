"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var app = express();
var hostname = '127.0.0.1';
var port = 3000;
var fs = require('fs');
app.use(cors());
app.use(express.json());
app.get('/datos', function (req, res) {
    //res.send("Hola mundo");
    fs.readFile('notas.json', function (err, data) {
        if (err)
            throw err;
        var notas = JSON.parse(data);
        res.send(notas);
    });
});
app.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
app.post('/datos', function (req, res) {
    //console.log(req.body)
    fs.readFile('notas.json', function (err, data) {
        if (err)
            throw err;
        var lista = JSON.parse(data);
        var titulo = req.body.titulo;
        var estado = req.body.estado;
        var descripcion = req.body.descripcion;
        if (req.body.id != 0) {
            for (var i = 0; i < lista.length; i++) {
                if (req.body.id == lista[i].id) {
                    lista[i].titulo = titulo;
                    lista[i].descripcion = descripcion;
                    lista[i].estado = estado;
                }
            }
        }
        else {
            var id = lista.length + 1;
            var nuevaNota = {
                titulo: titulo,
                estado: estado,
                descripcion: descripcion,
                id: id
            };
            lista.push(nuevaNota);
            console.log(lista.length);
        }
        var json = JSON.stringify(lista);
        fs.writeFile('notas.json', json, function (err) {
            if (err)
                res.status(500).json({ message: 'Internal Server Error' });
            res.status(201).json({
                mensaje: true
            });
        });
    });
});
// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req:any, res:any) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// const express = require('express');
// const app = express();
// app.get('/', (req:any, res:any) => {
//   res.send('Hello from App Engine!');
// });
