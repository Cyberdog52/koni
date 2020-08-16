import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../shared/model/menu-dtos";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private backendUrl = "api/products/";

  constructor(private httpClient: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.backendUrl);
  }

  public create(productName: string): Observable<Product> {
    return this.httpClient.post<Product>(`${this.backendUrl}`, productName);
  }

}
