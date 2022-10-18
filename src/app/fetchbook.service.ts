import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, map, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Book } from './Book';
import { isEmpty ,first} from 'rxjs/operators';  
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchbookService {

  private googleApiQueryLink = "https://www.googleapis.com/books/v1/volumes?q=";
  public bookMap = new Map();
  public booktest: any = new Object();
  public bookList: Book[] = [];
  public bookBehavior = new BehaviorSubject<Book[]>(this.bookList)
  public bookBehavior$ = this.bookBehavior.asObservable()

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getBookBehavior():Observable<Book[]>{
    return this.bookBehavior$;
  }

  setBookBehavior(bookitem : Book[]){
    return this.bookBehavior.next(bookitem);
  }

  fetchBook(searchTerm: string): Observable<Object> {
    this.bookList = []
    this.booktest = []
    let _this = this
    const completeSearchURL = `${this.googleApiQueryLink}${searchTerm}`;
    this.http.get<Object>(completeSearchURL)
      .pipe(
        first(),
        catchError(this.handleError<Object>(`getBook searchTerm=${searchTerm}`))
      ).subscribe({
        next(x) {
          if(x){
            _this.booktest = x
          }
        },
        error(x) { console.log('error occure' + x) },
        complete() {
          _this.bookMap = _this.booktest.items
          _this.bookMap.forEach(
            (x: any) => {
              _this.bookList.push(x);
            })
            _this.setBookBehavior(_this.bookList)
        }
      }
      );

    return this.booktest;

  }

  getBook(searchTerm: string): Book[] {
    this.fetchBook(searchTerm);
    return this.bookList
  }

  getBookA(): Book[] {
    return this.bookList
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
