import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IConvert } from '../../../shared/interfaces/conversion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private baseUrl = process.env.NODE_ENV === 'production' ? `http://demoebsga-env.eba-b28bc2gd.us-east-1.elasticbeanstalk.com/api/v1/` : `http://localhost:3000/api/v1/`;

  constructor(private readonly http: HttpClient) {}

  isValid(payload: IConvert): Observable<any>{
    return this.http.post(`${this.baseUrl}\convert`, payload)
    .pipe(
      catchError(e => {
        console.log('error', e)
        return of({ message: "", error: true })
      })
    )
  }
}
