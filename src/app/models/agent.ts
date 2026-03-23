import { Ability } from "./ability";

export interface Agent {
  uuid: string;
  name: string;
  role: string | null;
  icon: string;
  description: string;
  abilities: Ability[];
}

