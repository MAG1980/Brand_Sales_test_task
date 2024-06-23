export class ContactEntity {
  constructor({ id, name, responsible_user_id, phones, emails }) {
    this.id = id;
    this.name = name;
    this.responsible_user_id = responsible_user_id;
    this.phones = phones;
    this.emails = emails;
  }

  id: number;
  name: string;
  responsible_user_id: number;
  phones: string[];
  emails: string[];
}
