import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, AbstractControl,Validators} from '@angular/forms';
import {Notas} from '../../interfaces/notas';
import {NotaServService} from '../../nota-serv.service'
import {Router} from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {


  constructor(public fb:FormBuilder,private serv:NotaServService, private router: Router) { 

  }

  lista:Array<Notas>=[];

  listaCerrado:Array<Notas>=[];   
  listaEnProceso:Array<Notas>=[];   
  listaAbierto:Array<Notas>=[];

  ngOnInit(): void {
    this.serv.consulta().subscribe(datos=>{
      for(let i=0;i<datos.length;i++){
        this.lista.push(datos[i])
        
      }
      this.listaCerrado=this.lista.filter(nota => nota.estado === 'cerrado')
      this.listaEnProceso=this.lista.filter(nota => nota.estado === 'enProceso')
      this.listaAbierto=this.lista.filter(nota => nota.estado === 'abierto')
    })

  }
 
  clickearNota(id:any,titulo:any,estado:any,descripcion:any){
    var nId:number=+id
    this.serv.listaId.push(nId)
    this.serv.titulo=titulo
    this.serv.estado=estado
    this.serv.descripcion=descripcion
    this.router.navigate(['editar']);
  }

}
