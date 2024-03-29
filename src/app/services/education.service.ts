import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../model/education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  eduURL= environment.URL+"edu/";

  constructor(private httpClient: HttpClient) { }

  public eduList(): Observable<Education[]>{
    return this.httpClient.get<Education[]>(this.eduURL+'active-edu');
  }
  public getEdu(id: number): Observable<Education>{
    return this.httpClient.get<Education>(this.eduURL+`get-edu/${id}`);
  }
  public saveEdu(education: Education): Observable<any>{
    return this.httpClient.post<any>(this.eduURL+'create-edu', education);
  }
  public updateEdu(id:number, education: Education): Observable<any>{
    return this.httpClient.patch<any>(this.eduURL+`update-edu/${id}`, education);
  }
  public disableEdu(id:number): Observable<any>{
    return this.httpClient.patch<any>(this.eduURL+`disable-edu/${id}`, {});
  }
  public getActiveEduById(id:number): Observable<Education[]>{
    return this.httpClient.get<Education[]>(this.eduURL+`active-edu-by-id/${id}`);
  }
}
