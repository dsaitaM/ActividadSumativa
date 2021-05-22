import { Injectable } from '@angular/core';
import { Notas, } from './interfaces/notas';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaServService {

  servidor="http://127.0.0.1:3000/"
  titulo:string=""
  estado:string=""
  descripcion:string=""
  id:number=1


  listaId:Array<number>=[]

  constructor(private servicio:HttpClient) { }

  consulta(): Observable<any>{
    return this.servicio.get(`${this.servidor}datos`);
  }

  agregarNota(nuevaNota: Notas) {
    return this.servicio.post<Notas>(`${this.servidor}datos`, nuevaNota).subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err)
    );


  }

}
