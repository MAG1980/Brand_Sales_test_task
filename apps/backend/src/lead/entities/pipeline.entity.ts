import { StatusEntity } from '@backend/lead/entities/status.entity';

export class PipelineEntity {
  id: number;
  name: string;
  _embedded: {
    statuses: StatusEntity[];
  };
}
