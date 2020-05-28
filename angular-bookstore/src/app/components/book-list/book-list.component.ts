import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  previousCategoryId: number = 1;

  constructor(private bookService: BookService, 
            private activatedRoute: ActivatedRoute, 
            private paginationConfig: NgbPaginationConfig) {
              paginationConfig.maxSize=3;
              paginationConfig.boundaryLinks=true;
             }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })
  }

  listBooks() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.bookService.getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize).subscribe(
      this.processPaginate());
  }

  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  handleSearchBooks() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');
    this.bookService.searchBooks(keyword, this.currentPage-1, this.pageSize).subscribe(
      this.processPaginate());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

}
