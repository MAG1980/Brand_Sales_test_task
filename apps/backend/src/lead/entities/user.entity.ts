export class UserEntity {
  constructor({ id, name, email, lang }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.lang = lang;
  }
  id: number;
  name: string;
  email: string;
  lang: string;
}
