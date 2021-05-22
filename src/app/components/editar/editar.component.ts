import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, AbstractControl,Validators} from '@angular/forms';
import {Notas} from '../../interfaces/notas';
import {Router} from '@angular/router';
import {NotaServService} from '../../nota-serv.service'
import { ExpressionType } from '@angular/compiler';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  notas:Notas = {
    titulo:'',
    descripcion:'',
    estado:'',
    id:0
  };
  formulario:FormGroup;
  lista:Array<Notas>=[];
  auxLista:Array<Notas>=[]
  titulo:string=this.serv.titulo
  estado:string=this.serv.estado
  descripcion:string=this.serv.descripcion
  constructor(public fb:FormBuilder,private router: Router,private serv:NotaServService) {

    this.formulario=this.fb.group({
      titulo:[this.titulo],
      estado:[this.estado],
      descripcion:[this.descripcion]
     });
     
     const cont:number=0;
   }

  ngOnInit(): void {
    this.serv.consulta().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.lista.push(datos[i])
        
      }
    });

    
  }

  editarNota(){
    if (this.formulario.controls["titulo"].value== ""){
      alert("Rellene el título");
      return;
    }
  
     if (this.formulario.controls["estado"].value== ""){
      alert("Seleccion un estado para su tarea");
       return;
      }
  
      if (this.formulario.controls["descripcion"].value== ""){
      alert("Rellene la descripción");
      return;
      }
    let auxId:number=this.serv.listaId[0]
    this.serv.listaId.pop()
    for (let i=0;i<this.lista.length;i++){
        if(this.lista[i].id==auxId){
          let notas:Notas={titulo:this.formulario.controls["titulo"].value,
          estado:this.formulario.controls["estado"].value,
          descripcion:this.formulario.controls["descripcion"].value,
          id:auxId
        }
        this.serv.agregarNota(notas)
        this.router.navigate(['/notas']).then(() => {
          window.location.reload();
        });
        }
    }
  }

  eliminarNota(){
    let auxId:number=this.serv.listaId[0]
    this.serv.listaId.pop()
    for (let i=0;i<this.lista.length;i++){
      if(this.lista[i].id==auxId){
        let notas:Notas={titulo:"",
          estado:"",
          descripcion:"",
          id:auxId
      }
      this.serv.agregarNota(notas)
      this.router.navigate(['/notas']).then(() => {
        window.location.reload();
      });
    }
  }

}
}
