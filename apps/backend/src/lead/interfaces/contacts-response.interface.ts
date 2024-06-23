import { Contact } from '@backend/lead/interfaces/contact.interface';

export interface ContactsResponse {
  _embedded: {
    contacts: Contact[];
  };
}
