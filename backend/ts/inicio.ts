const express = require('express');
const cors = require('cors');
const app=express();

const hostname = '127.0.0.1';
const port = 3000;

const fs = require('fs');

app.use(cors());
app.use(express.json())

app.get('/datos',(req:any,res:any) => {
    fs.readFile('notas.json', (err:any, data:any) =>{
      if (err) throw err;
      let notas = JSON.parse(data);
      res.send(notas);
    });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export interface Notas {
  titulo:string,
  descripcion:string,
  estado:string,
  id:number
}

app.post('/datos', (req:any, res:any)=>{
  fs.readFile('notas.json', (err:any, data:any) =>{
    if (err) throw err;
    let lista:Array<Notas> = JSON.parse(data);
    let titulo:string = req.body.titulo;
    let estado:string = req.body.estado;
    let descripcion:string = req.body.descripcion;
    if (req.body.id!=0){
        for(let i=0;i<lista.length;i++){
          if(req.body.id==lista[i].id){
            lista[i].titulo=titulo
            lista[i].descripcion=descripcion
            lista[i].estado=estado
          }
        }
    }else{
      let id:number = lista.length+1;
      let nuevaNota:Notas = {
       titulo,
        estado,
       descripcion,
       id
      };
      lista.push(nuevaNota);
     console.log(lista.length)
    }
      const json = JSON.stringify(lista);
      fs.writeFile('notas.json', json, (err:any)=>{
       if (err) res.status(500).json({message: 'Internal Server Error'});
       res.status(201).json({
         mensaje: true
       });
      });
  });
})
