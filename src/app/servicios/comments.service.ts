import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../modelos/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  	private readonly xurlApi = "https://jsonplaceholder.typicode.com/comments";
	
    private readonly xhttp = inject(HttpClient);
	  getComentarios(): Observable<Comments[]> {
		return this.xhttp.get<Comments[]>(this.xurlApi);
	}
}
