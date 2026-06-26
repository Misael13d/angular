import { Component, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {Movilidad} from './modelo/movilidad';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guia26');

  regForm! : FormGroup

  register: Movilidad = {
    placa: "",
    color: "",
    modelo: 1990
  }

  enviarDatos():void{
    console.log("guardar datos");
  }
}
