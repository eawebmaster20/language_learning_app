import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from '../interfaces/quizInterface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return this.http.get<Categories>('../../assets/data.json');
  }
}
