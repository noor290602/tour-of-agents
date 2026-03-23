import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private dataUrl = 'assets/data/agents.json';
  http = inject(HttpClient);

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.dataUrl);
  }
}
