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

  getBooks(theCategoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }

  getCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
      map(resposne => resposne._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/searchbyname?name=${keyword}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
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
}
