import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guia26');
  regForm : FormGroup
  xenviado:boolean=false
  departamentos:string[] = ['Tarija', 'Oruro', 'Potosi', 'La Paz', 'Cochabamba', 'Santa Cruz', 'Beni', 'Pando', 'Chuquisaca']


  constructor(){
    this.regForm = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.minLength(4)]),
      color: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      modelo: new FormControl('', [Validators.required]),
      registrado: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      correo: new FormControl('', [
        Validators.required, 
        Validators.maxLength(15),
        Validators.pattern('^([1][8-9]|[2-5][0-9]|[6][0-5])$')
      ]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)])
    })
  }

  get f(){
    return this.regForm.controls
  }


  enviarDatos():void{
    this.xenviado = true
    if(this.regForm.invalid){
      return

    }
    console.log("Guardar Datos en la DB")
  }

}