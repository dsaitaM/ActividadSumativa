import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, AbstractControl,Validators} from '@angular/forms';
import {Notas} from '../../interfaces/notas';
import {Router} from '@angular/router';
import {NotaServService} from '../../nota-serv.service'
import { ExpressionType } from '@angular/compiler';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  formulario:FormGroup;
  lista:Array<Notas>=[];
  constructor(public fb:FormBuilder,private router: Router,private serv:NotaServService) { //constructor(private fb:FormBuilder) {
    this.formulario=this.fb.group({
      titulo:['',[Validators.required]],
      estado:['',[Validators.required]],
      descripcion:['',[Validators.required,Validators.maxLength(150)]]
     });
     
   }

  ngOnInit(): void {

  }

  listaCerrado:Array<Notas>=[];   
  listaEnProceso:Array<Notas>=[];   
  listaAbierto:Array<Notas>=[];
  

  Crear(){

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
  
    let notas:Notas={titulo:this.formulario.controls["titulo"].value,
      estado:this.formulario.controls["estado"].value,
      descripcion:this.formulario.controls["descripcion"].value,
      id:0
    }

    this.serv.agregarNota(notas)
    this.router.navigate(['/notas']).then(() => {
      window.location.reload();
    });

  }

}
