import { JsonpClientBackend } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject ,of} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FetchbookService } from '../fetchbook.service';
import { MessageService } from '../message.service';
import { Book } from '../Book';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


@Injectable({
  providedIn: 'root'
})
export class SearchComponent implements OnInit {

  constructor(private fetchBook: FetchbookService, private messageService: MessageService,private route:ActivatedRoute,private router:Router) { }

  public booksInfo: any = [];
  public bookInfoLOLOL: any = [];
  public bookObs$ = new Observable<any>()
  public test: any = [];
  public bookMap: any = [];
  public bookList: Book[] = [];

  log(searchItem: string): void {
    //this.messageService.add(`${searchItem}`);
  }//change this to search

  onSearch(searchItem: string): void {
    this.bookList = [];
    this.search(searchItem);
    //this.router.navigate(['/booklist']).then(()=>window.location.reload())
  }

  search(searchItem: string): void {

    this.bookList = this.fetchBook.getBook(searchItem)
  }


  getBook():Observable<Book[]>{
    return of(this.bookList);
  }


  print(): void {

    this.booksInfo.forEach((element: any) => {
      this.messageService.add('test: ' + element.get('title'))
    });
  }



  ngOnInit(): void {

  }
}
