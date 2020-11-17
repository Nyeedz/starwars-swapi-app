import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handlerError(error: HttpErrorResponse): void {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `${error.status}\n${error.message}`;
    }

    // this.toastr.error(errorMessage, 'Oh no!');
  }
}
