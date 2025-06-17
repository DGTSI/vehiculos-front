import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IFolder } from '@shared/types/ifolder.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleApiService {

  private urlApi: string = `${environment.urlBack}/vehicle`;
  private urlVerifyFolder: string = `${this.urlApi}/consultar-folder`;
  private urlVerifyPlate: string = `${this.urlApi}/consultar-placas`;
  private urlVerifySerial: string = `${this.urlApi}/consultar-noserie`;

  constructor(
    private http: HttpClient,
  ) { }

  // Validar el folder
  public validateFolder(folder: IFolder): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlVerifyFolder}`, folder);
  }

  // Validar el folder
  // public validateFolder(folder: string): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.urlVerifyFolder}?folder=${folder}`);
  // }

  // Validar las placas
  public validatePlate(plate: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlVerifyPlate}?placas=${plate}`);
  }

  // Validar el NIV
  public validateSerial(serial: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlVerifySerial}?noserie=${serial}`);
  }
}
