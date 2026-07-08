import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonalService } from './servicios/personal.service';
import { Student } from './modelos/student.interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proy2');
  private readonly xapiService = inject(PersonalService)
   protected listaStudent = signal<Student[]>([])
  regForm: FormGroup
  @ViewChild('botonCancelar') botonCerrar!: ElementRef;

  constructor() {
    this.regForm = new FormGroup({
      ru: new FormControl('', Validators.required),
      name: new FormControl(''),
      ap: new FormControl(''),
      am: new FormControl('')
    })
  }
  ngOnInit():void{
      this.listarEstudiantes()
  }
  listarEstudiantes(){
    this.xapiService.getStudent().subscribe({
        next: (dat: Student[]) => {
          this.listaStudent.set(dat)
        },
        error:(err) => {
          console.log('Error al conectar con la API',err)        
        }
      })
  }

  enviarDatos() {
    if (this.regForm.invalid) { return }
    console.log('Guardando datos...' + JSON.stringify(this.regForm.value))
    const datosParaGuardar = {
      "ru": this.regForm.get('ru')?.value,
      "name": this.regForm.get('name')?.value,
      "ap": this.regForm.get('ap')?.value,
      "am": this.regForm.get('')?.value,
      "estado": 1
    }
    this.xapiService.crearStudent(datosParaGuardar).subscribe({
      next: (respuestaDelServidor) => {
        console.log('¡Servidor respondió con éxito!', respuestaDelServidor);
        this.listarEstudiantes()
      },
      error: (err) => {
        console.error('Error al hacer el POST:', err);
      }
    });
  }

}//end of class
