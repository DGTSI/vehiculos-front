import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { IComplainant } from '@shared/types/icomplainant.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerApiService {
  
  private urlApi: string = `${environment.urlBack}/complainant`;
  private urlSaveComplainant: string = `${this.urlApi}/save-complainant`;
  private urlValidateComplainant: string = `${this.urlApi}/validate-complainant`;

  constructor(
    private http: HttpClient,
  ) { }

  public validateComplainant(ctrluinv: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlValidateComplainant}?ctrluinv=${ctrluinv}`);
  }

  public saveComplainant(dto: IComplainant): Observable<boolean> {
    return this.http.post<boolean>(this.urlSaveComplainant, dto);
  }
}
