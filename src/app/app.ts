import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonasService, Student } from './servicio/personas.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proy2');
  private readonly apiService = inject(PersonasService) 
 @ViewChild('modModal') modalElement!: ElementRef
 protected alumno = signal <Student | null>(null)

  protected listaStudent = signal<Student[]>([])
  regForm: FormGroup
  @ViewChild('botonCancelar') botonCerrar!: ElementRef;

  constructor(){
    this.regForm = new FormGroup({
      ru: new FormControl('',Validators.required),
      name: new FormControl(''),
      ap: new FormControl(''),
      am: new FormControl(''),
    })
  }

  ngOnInit():void{
      this.listarEstudiantes()
  }
  listarEstudiantes(){
    this.apiService.getStudent().subscribe({
        next: (dat) => {
          this.listaStudent.set(dat)
        },
        error:(err) => {
          console.log('Error al conectar con la API',err)        
        }
      })
      this.regForm.reset();
  }

	buscarEstudiante(ru: number) {
		this.apiService.getStudentByRu(ru).subscribe({
		  next: (studentEncontrado) => {
			this.alumno.set(studentEncontrado);
			console.log('ALumno Encontrado:', studentEncontrado);
      this.regForm.patchValue({
        ru: studentEncontrado.ru,
        name: studentEncontrado.name,
        ap: studentEncontrado.ap,
        am: studentEncontrado.am
      });
		  },
		  error: (err) => {
			console.error('Error al obtener el estudiante:', err);
		  }
		});
	}

  enviarDatos(){
    this.regForm.reset();
    if (this.regForm.invalid){ return }
    console.log("Guardando Datos..."+JSON.stringify(this.regForm.value))
    const datosParaGuardar = {
      	"ru": this.regForm.get('ru')?.value,
        "name": this.regForm.get('name')?.value,
        "ap": this.regForm.get('ap')?.value,
        "am": this.regForm.get('am')?.value,
        "estado": 1
    }
    this.apiService.crearStudent(datosParaGuardar).subscribe({
          next: (respuestaDelServidor) => {
            console.log('¡Servidor respondió con éxito!', respuestaDelServidor);
            this.listarEstudiantes()
          },
          error: (err) => {
            console.error('Error al hacer el POST:', err);
          }
    });
    this.botonCerrar.nativeElement.click();
    this.regForm.reset();
  }
  
  cargarAlumnos(ru:number):void{
    console.log("llego alumno con ru: "+ru)
		this.buscarEstudiante(ru);
		if (this.modalElement) {
		  // Pasamos el nativeElement de Angular a Bootstrap
		  const myModal = new bootstrap.Modal(this.modalElement.nativeElement);
		  myModal.show();
		}
	}


  guardarModificacion():void{
		if (this.regForm.invalid) return;

		const datosActualizados = this.regForm.value as Student;
		const ru = datosActualizados.ru;

		if (!ru) {
		  console.error('No se encontró el RU del estudiante');
		  return;
		}

		this.apiService.updateStudent(ru, datosActualizados).subscribe({
		  next: (estudianteModificado) => {
			console.log('Estudiante actualizado con éxito:', estudianteModificado);
        this.listarEstudiantes();
            this.regForm.reset();
			this.cerrarModal();
		  },
		  error: (err) => {
			console.error('Error al actualizar el estudiante:', err);
		  }
		});
    this.regForm.reset();
	}

  cerrarModal() {
        if (this.modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(this.modalElement.nativeElement);
          modalInstance?.hide();
        }
	}

}//end of class