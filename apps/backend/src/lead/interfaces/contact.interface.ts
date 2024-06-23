export interface Contact {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  responsible_user_id: number;
  custom_fields_values: {
    field_id: number;
    field_name: string;
    field_value: string;
    values: {
      value: string;
      enum_id: number;
      enum_code: string;
    }[];
  }[];
}
