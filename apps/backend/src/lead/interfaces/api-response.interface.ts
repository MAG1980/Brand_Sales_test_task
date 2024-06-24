import { PipelineEntity } from '@backend/lead/entities/pipeline.entity';
import { ContactEntity } from '@backend/lead/entities/contact.entity';
import { LeadEntity } from '@backend/lead/entities/lead.entity';
import { UserEntity } from '@backend/lead/entities/user.entity';

export interface ApiResponse {
  pipelines: PipelineEntity[];
  contacts: ContactEntity[];
  leads: LeadEntity[];
  users: UserEntity[];
}
