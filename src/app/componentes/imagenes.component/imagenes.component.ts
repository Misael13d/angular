import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const imageMap: Record<string, string> = {
  moto: 'moto.png',
  bicicleta: 'bicicleta.png',
  movilidad: 'coche.png'
};

@Component({
  selector: 'app-imagenes.component',
  imports: [],
  templateUrl: './imagenes.component.html',
  styleUrl: './imagenes.component.css'
})
export class ImagenesComponent {
  public name = 'Imagen';
  public imageSrc = 'images/moto.png';
  public alt = 'Imagen';

  constructor(route: ActivatedRoute) {
    const opcion = route.snapshot.paramMap.get('nombre')?.toLowerCase() ?? 'moto';
    const fileName = imageMap[opcion] || imageMap['movilidad'];
    this.name = opcion.charAt(0).toUpperCase() + opcion.slice(1);
    this.imageSrc = `images/${fileName}`;
    this.alt = `Imagen de ${this.name}`;
  }
}
