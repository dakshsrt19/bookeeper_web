import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private ApiUrl = 'https://localhost:7118/api';

  constructor(private http: HttpClient) { }
}
