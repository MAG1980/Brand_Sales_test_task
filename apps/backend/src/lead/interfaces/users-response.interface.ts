import { UserEntity } from '@backend/lead/entities/user.entity';

export interface UsersResponse {
  _embedded: {
    users: UserEntity[];
  };
}
