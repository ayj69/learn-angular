import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FetchbookService } from '../fetchbook.service';
import { Book } from '../Book';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(public search:SearchComponent,private fetchBook: FetchbookService) { }

  public bookList:Book[] = []
  destroy$ = new Subject();

  ngOnInit(): void {
    this.fetchBook.getBookBehavior().pipe(takeUntil(this.destroy$)).subscribe((x)=>this.bookList=x)
    console.log(this.bookList)
  }

  ngOnChanges():void{
    
  }

  ngOnDestroy():void{
    this.destroy$.complete;
  }

}
