import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/agent';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, KeyValuePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  agentService = inject(AgentsService);

  agents = signal<Agent[]>([]);


 // 👉 Computed signals for metrics
  totalAgents = computed(() => this.agents().length);

  rolesCount = computed(() => {
    const counts: Record<string, number> = {};
    this.agents().forEach(a => {
      if (a.role) {
        counts[a.role] = (counts[a.role] || 0) + 1;
      }
    });
    return counts;
  });


  ngOnInit() {
    this.agentService.getAgents().subscribe(data => {
      this.agents.set(data);
    });
  }

}
