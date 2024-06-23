import { Lead } from '@backend/lead/interfaces/lead.interface';

export interface LeadsResponse {
  _embedded: {
    leads: Lead[];
  };
}
