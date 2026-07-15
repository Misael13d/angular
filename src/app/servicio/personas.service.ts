import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { map, Observable } from 'rxjs';

export interface Student {
  ru: number;
  name: string;
  ap: string;
  am: string;
  estado: number;
}
export interface ApiResponse {
  httpHeaders: any;
  httpStatusCode: number;
  message: string;
  otherParams: any;
  data: Student[];
  data2: any;
}

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  private readonly http = inject(HttpClient);
  
  private readonly urlApi = 'https://tallerweb.uajms.edu.bo';

  getStudent(): Observable<Student[]> {
    return this.http.get<ApiResponse>(this.urlApi+'/api/student').pipe(map(response => response.data)
    );
  }


	getLogin(xlogin: string, xpass: string): Observable<Data> {
	  const body = {
		username: xlogin,
		password: xpass,
	  };
	  const httpOptions = {
		headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		}),
	  };
	  return this.http.post<Data>(this.urlApi+"/auth/log-in", body, httpOptions);
	}

	setCurrentSession(sessionName: string, data: string): void {
		sessionStorage.setItem(sessionName, JSON.stringify(data));
	}

	getToken(): string {
		const session = this.getCurrentSession<Data>('currentUser');
		return session?.['otherParams'].token ?? '';
	}

	getCurrentSession<T = any>(sessionName: string): T | null {
		const data = sessionStorage.getItem(sessionName);
		return data ? (JSON.parse(data) as T) : null;
	}

  getPredios(): Observable<any> {
		let url:string = this.urlApi+"/api/predios/libres"
		const xToken = this.getToken()
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer '+xToken);
		return this.http.get<{ data : any }>(url, { headers: headers }).pipe(
		  map((response) => response.data)
		);
	}

}
