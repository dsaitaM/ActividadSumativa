import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from '../app/components/main/main.component';
import {NotasComponent} from '../app/components/notas/notas.component';
import {EditarComponent} from '../app/components/editar/editar.component';

const routes: Routes = [
  {path:"",component:MainComponent},
  {path:"notas",component:NotasComponent},
  {path:"editar",component:EditarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
