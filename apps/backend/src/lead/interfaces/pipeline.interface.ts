import { StatusEntity } from '@backend/lead/entities/status.entity';

export interface Pipeline {
  id: number;
  name: string;
  _embedded: {
    statuses: StatusEntity[];
  };
}
