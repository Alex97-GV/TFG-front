import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  private httpClient = inject(HttpClient);

  public get<T>(url: string, params?: any): Observable<T> {
    const options = {
      params: new HttpParams({
        fromObject: params,
      }),
      headers: new HttpHeaders(),
    };
    return this.httpClient.get<T>(url, options).pipe(
      map((result: T) => {
        return result;
      })
    );
  }

  public post<T>(url: string, body?: any): Observable<T> {
    return this.request<T>('post', url, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.request<T>('put', url, body);
  }

  public patch<T>(url: string, body: any): Observable<T> {
    return this.request<T>('patch', url, body);
  }

  public delete<T>(url: string, action?: string): Observable<T> {
    const options = {
      headers: new HttpHeaders(),
    };
    return this.httpClient
      .delete<T>(url, options)
      .pipe(map((result: T) => result));
  }

  private request<T>(
    method: 'post' | 'put' | 'patch',
    url: string,
    body: any
  ): Observable<T> {
    const options = {
      headers: new HttpHeaders(),
    };
    return this.httpClient[method]<T>(url, body, options).pipe(
      map((result: T) => result)
    );
  }
}
