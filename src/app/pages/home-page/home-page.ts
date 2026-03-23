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

  totalAgents = computed(() => this.agents().length);

  roleIcons: Record<string, string> = {
    Sentinel: 'https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png',
    Initiator: 'https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png',
    Controller: 'https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png',
    Duelist: 'https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png',
  };

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
