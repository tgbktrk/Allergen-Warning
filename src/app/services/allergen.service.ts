import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

export interface ApiResult {
  products: string;
  allergens: string;
}

@Injectable({
  providedIn: 'root'
})

export class AllergenService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  getProducts(barcode:string): Observable<any> {
    var variable: any
    variable : `${environment.baseUrl}/api/v2/product/3017624010701`;
   console.log(variable);
    return this.httpClient.get(
      `${environment.baseUrl}/api/v2/product/${barcode}`
    );
    // .pipe(
    //   tap(() => 
    //   this.router.navigate(['/pages/allergens']))
    // );
    }
 
}
