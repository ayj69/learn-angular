import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable,Subject } from 'rxjs';
import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs';
import { FetchbookService } from '../fetchbook.service';
import { MessageService } from '../message.service';
import { Book } from '../Book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})



export class SearchComponent implements OnInit {

  constructor(private fetchBook:FetchbookService,private messageService:MessageService) { }

  public booksInfo:any = [];
  public bookInfoLOLOL:any = [];
  public bookObs$ = new Observable<any>()
  public test:any = [];
  public bookMap:any = [];
  public bookList:Book[] = [];

  log(searchItem:string):void{
    //this.messageService.add(`${searchItem}`);
  }//change this to search

  onSearch(searchItem:string):void{
    this.bookList=[];
    this.search(searchItem);
    //this.getBookAAA(searchItem);
    //this.tidyUp();
    //this.print();
  }

  search(searchItem:string):void{
    //this.booksInfo = [];
    let bookInfo:any = [];
    const _this = this
    this.fetchBook.getBook(`${searchItem}`)
    .pipe(
      (x)=> this.booksInfo = x 
    )
    .subscribe(
      {
      next(x){
        bookInfo = x 
        _this.booksInfo = x
        console.log(bookInfo)
      },
      error(err){console.log('error occure' + err)},
      complete(){

        _this.bookMap = _this.booksInfo.items
        _this.bookMap.forEach(
          (x:any) => {
            _this.bookList.push(x);
          }
        )
        console.log(_this.bookMap)
    }
    });
  }

  getBookAAA(searchItem:string):void{
    this.fetchBook.getBook(`${searchItem}`).subscribe(x => this.booksInfo = x);
    console.log(this.booksInfo);
  }

  // tidyUp():void{
  //   this.booksInfo = this.booksRawInfo.items;
  //   console.log(this.booksInfo);
  // }

  print():void{
    //console.log('this is item inside print()');
    //console.log(this.booksInfo);

    this.booksInfo.forEach((element:any) => {
      //console.log('inside loop test')
      this.messageService.add( 'test: ' + element.get('title') )
    });
  }



  ngOnInit(): void {

  }

}
