import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TestObject } from 'protractor/built/driverProviders';


@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  constructor(private http: HttpClient) { }

  baseUrlC: string = environment.apiUrlC;
  baseUrlBS: string = environment.apiUrlBS;

  getOrder(): Observable<any> {
    return this.http.get(this.baseUrlC + 'order/', this.getAuth());
  }

  getOrder_byid(id: any): Observable<any> {
    return this.http.get(this.baseUrlC + 'order/' + id , this.getAuth());
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrlC + 'order/', product , this.getAuth());
  }

  deleteProduct(id_item: any) {
    return this.http.delete( this.baseUrlC + 'order/' +  id_item, {headers: this.getAuthDelete()});
  }

  editProduct(product: any) {
    return this.http.put(this.baseUrlC + 'order/' , product, this.getAuth());
  }

  getAuth() {
    const token = localStorage.getItem('token');
    const content = 'application/json; charset=utf-8';
    const httpheaders = new HttpHeaders({ 'Content-Type': content , 'token': token});
    return { headers: httpheaders };
  }

  getAuthDelete() {
    const token = localStorage.getItem('token');
    const httpheaders = new HttpHeaders({'Content-Type': 'application/json' , 'token': token});
    return  httpheaders;
  }

}
