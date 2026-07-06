import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../modelos/student.interface';
import { ApiResponse } from '../modelos/response.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private readonly xhttp = inject(HttpClient);
  private readonly xurlApi = 'https://tallerweb.uajms.edu.bo/api/student';

  getAlumnos(): Observable<Student[]> {
		return this.xhttp.get<ApiResponse>(this.xurlApi).pipe(map(res => res.data));
	}
}
