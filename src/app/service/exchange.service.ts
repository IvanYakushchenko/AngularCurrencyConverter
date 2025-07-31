import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) {}

  getRates(): Observable<Record<string, number>> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) => {
        const rates: Record<string, number> = {};
        data.forEach(item => {
          rates[item.cc] = item.rate;
        });
        return rates;
      })
    );
  }
}