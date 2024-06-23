import { LeadEntity } from '@backend/lead/entities/lead.entity';
import { ContactEntity } from '@backend/lead/entities/contact.entity';

export interface LeadsResponse {
  _embedded: {
    leads: LeadEntity[];
    _embedded: {
      contacts: ContactEntity[];
    };
  };
}
