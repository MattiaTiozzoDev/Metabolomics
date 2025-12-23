import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Limit } from '../types/limit.type';
import { Explanations } from '../types/explanations.type';

@Injectable({ providedIn: 'root' })
export class StaticDataService {
  private limit: Limit[] | null = null;
  private explanations: Explanations[] | null = null;

  constructor(private http: HttpClient) {}

  loadLimit(): Observable<Limit[]> {
    return this.http.get<Limit[]>('assets/jsons/limit.json').pipe(
      tap((data) => {
        this.limit = data;
      })
    );
  }

  loadExplanations(): Observable<Explanations[]> {
    return this.http.get<Explanations[]>('assets/jsons/explanations.json').pipe(
      tap((data) => {
        this.explanations = data;
      })
    );
  }
}
