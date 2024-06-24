import { ContactEntity } from '@backend/lead/entities/contact.entity';

export class LeadEntity {
  constructor({
    id,
    name,
    price,
    responsible_user_id,
    status_id,
    pipeline_id,
    created_at,
    contacts,
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.responsible_user_id = responsible_user_id;
    this.status_id = status_id;
    this.pipeline_id = pipeline_id;
    this.created_at = created_at;
    this.contacts = contacts;
  }

  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  status_id: number;
  pipeline_id: number;
  created_at: number;
  contacts: ContactEntity[];
}
