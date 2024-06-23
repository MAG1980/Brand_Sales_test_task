import { ContactEntity } from '@backend/lead/entities/contact.entity';

export interface Lead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  status_id: number;
  pipeline_id: number;
  created_at: number;
  _embedded: {
    contacts: ContactEntity[];
  };
}
