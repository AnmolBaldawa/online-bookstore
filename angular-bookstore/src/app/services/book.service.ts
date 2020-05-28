import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl = "http://localhost:8080/books"
  private categoryUrl = "http://localhost:8080/book-category"

  constructor(private httpClient: HttpClient) { 
  }

  getBooks(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBooks> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  getCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(resposne => resposne._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBooks> {
    const searchUrl = `${this.baseUrl}/search/searchbyname?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  get(bookId: number): Observable<Book> {
    const bookDetailsUrl: string = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }

}

interface GetResponseCategories {
  _embedded: {
    bookCategory: BookCategory[];
  }
}

interface GetResponseBooks {
  _embedded: {
    books: Book[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    numner: number
  }
}
