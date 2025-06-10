import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IComplainant } from '@shared/types/icomplainant.type';
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
  public validateFolder(folder: string): Observable<IComplainant> {
    return this.http.get<IComplainant>(`${this.urlVerifyFolder}?folder=${folder}`);
  }

  // Validar las placas
  public validatePlate(plate: string): Observable<IComplainant> {
    return this.http.get<IComplainant>(`${this.urlVerifyPlate}?placas=${plate}`);
  }

  // Validar el NIV
  public validateSerial(serial: string): Observable<IComplainant> {
    return this.http.get<IComplainant>(`${this.urlVerifySerial}?noserie=${serial}`);
  }
}
