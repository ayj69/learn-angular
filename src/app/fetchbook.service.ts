import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, map, Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FetchbookService {

  private googleApiQueryLink = "https://www.googleapis.com/books/v1/volumes?q=";
  public bookMap = new Map();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }



  getBook(searchTerm: string): Observable<Object> {
    const completeSearchURL = `${this.googleApiQueryLink}${searchTerm}`;
    return this.http.get<Object>(completeSearchURL)
      .pipe(
        catchError(this.handleError<Object>(`getBook searchTerm=${searchTerm}`))

      )

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO : send the error to remote logging infrastructure
      console.error(error); // log to console instate
      //TODO : better job of transforming error for user consumption
      //Let the app keep running by returing an empty result.
      return of(result as T);


    }
  }

}
