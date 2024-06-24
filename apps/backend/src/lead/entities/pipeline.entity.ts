import { StatusEntity } from '@backend/lead/entities/status.entity';
import { LeadEntity } from '@backend/lead/entities/lead.entity';

export class PipelineEntity {
  constructor({ id, name, leads, statuses }) {
    this.id = id;
    this.name = name;
    this.leads = leads;
    this.statuses = statuses;
  }

  id: number;
  name: string;
  leads: LeadEntity[];
  statuses: StatusEntity[];
}
