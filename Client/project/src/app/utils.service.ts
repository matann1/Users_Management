import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://localhost:8000/api/users');
  }

  getUser(id: string) {
    return this.http.get('http://localhost:8000/api/users/' + id);
  }

  updateUser(id: string, obj: any) {
    return this.http.put('http://localhost:8000/api/users/' + id, obj);
  }

  addUser(obj: any) {
    return this.http.post('http://localhost:8000/api/users', obj);
  }

  deleteUser(id: string) {
    return this.http.delete('http://localhost:8000/api/users/' + id);
  }
}
