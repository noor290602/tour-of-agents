import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/agent';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  agentService = inject(AgentsService);

  agents = signal<Agent[]>([]);

  ngOnInit() {
    this.agentService.getAgents().subscribe((data) => {
      
      console.log("DATA:", data);

      this.agents.set(data);
    });
  }
}
