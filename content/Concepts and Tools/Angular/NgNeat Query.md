---
title: NgNeat Query
draft: false
tags: 
date: 2024-01-27
---

# Some Notes about NGNeat/Query

[ngneat/query: 🚀 Powerful asynchronous state management, server-state utilities and data fetching for Angular Applications (github.com)](https://github.com/ngneat/query)

For an API that returns a response like this:

```json
{ 
"data": [ 
	{ "id": "018622cb-2c22-4054-8ec5-6510c292b141", "title": "Some Title", "author": "Jeffry" },
	{ "id": "018622cb-42a2-4eb4-a159-a0e604a293f3", "title": "Some Other Title", "author": "Jeffry" } 
	] 
}
```

Here is the service: 

```typescript
import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';

import {

  addEntity,

  QueryClientService,

  UseMutation,

  UseQuery,

} from '@ngneat/query';

import { map, tap } from 'rxjs';

  

@Injectable({ providedIn: 'root' })

export class BooksService {

  private http = inject(HttpClient);

  private useQuery = inject(UseQuery);

  private useMutation = inject(UseMutation);

  private queryClient = inject(QueryClientService);

  getBooks() {

    return this.useQuery(['books'], () =>

      this.http.get<{ data: BookEntity[] }>('http://localhost:5049/books')

    );

  }

  

  addBook() {

    return this.useMutation((req: BookCreate) => {

      return this.http

        .post<BookEntity>('http://localhost:5049/books', req)

        .pipe(

          tap((newBook) => {

            this.queryClient.setQueryData(

              ['books'],

              addEntity('data', newBook)

            );

          })

        );

    });

  }

}

type BookCreate = Omit<BookEntity, 'id'>;

export type BookEntity = {

  id: string;

  title: string;

  author?: string;

};
```

### The Component

```typescript
import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { mapResultData } from '@ngneat/query';

  

import { BookEntity, BooksService } from './books.service';

  

@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],

})

export class AppComponent {

  form = new FormGroup({

    title: new FormControl<string>('', { nonNullable: true }),

    author: new FormControl<string>('', { nonNullable: true }),

  });

  title = 'frontend';

  addBookMutation$ = this.booksService.addBook();

  books$ = this.booksService

    .getBooks()

    .result$.pipe(mapResultData((rd) => rd.data));

  constructor(private booksService: BooksService) {}

  submit() {

    const req: Omit<BookEntity, 'id'> = {

      title: this.form.controls.title.value,

      author: this.form.controls.author.value || undefined,

    };

  

    this.addBookMutation$.mutate(req);

  }

}
```

### For the DevTools

Install the dependency:

```shell
npm i -D @ngneat/query-devtools
```

```typescript
  providers: [

    isDevMode()

      ? {

          provide: ENVIRONMENT_INITIALIZER,

          multi: true,

          useValue() {

            const queryClient = inject(QueryClientService);

            import('@ngneat/query-devtools').then((m) => {

              m.ngQueryDevtools({ queryClient });

            });

          },

        }

      : [],

  ],
```