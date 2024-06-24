import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetLeadsDto } from '@backend/lead/dto/get-leads.dto';
import {
  LeadsResponse,
  PipelinesResponse,
  UsersResponse,
} from '@backend/lead/interfaces';
import { StatusEntity } from '@backend/lead/entities/status.entity';
import { ContactsResponse } from '@backend/lead/interfaces/contacts-response.interface';
import { ContactEntity } from '@backend/lead/entities/contact.entity';
import { UserEntity } from '@backend/lead/entities/user.entity';
import { PipelineEntity } from '@backend/lead/entities/pipeline.entity';
import { LeadEntity } from '@backend/lead/entities/lead.entity';

@Injectable()
export class LeadService {
  constructor(private readonly configService: ConfigService) {}

  async getData(getLeadsDto: GetLeadsDto) {
    const promiseLeads = this.fetchLeads(getLeadsDto);
    const promisePipelines = this.fetchPipelines();
    const promiseUsers = this.fetchUsers();
    const promiseContacts = this.fetchContacts();

    const data = await Promise.all([
      promiseLeads,
      promisePipelines,
      promiseUsers,
      promiseContacts,
    ])
      .then(([leads, pipelines, users, contacts]) => {
        return { leads, pipelines, users, contacts };
      })
      .catch((error) => {
        throw new HttpException(error, 500);
      });

    const newContacts = data.contacts.map((contact) => {
      const clearedContact = {
        ...contact,
        phones: contact.custom_fields_values?.find(
          (value) => value.field_name === 'Телефон',
        )?.values,
        emails: contact.custom_fields_values?.find(
          (value) => value.field_name === 'Email',
        )?.values,
      };

      return new ContactEntity(clearedContact);
    });

    const embeddedLeads = data.leads.map((lead) => {
      const contacts = lead.contacts.map((leadContact) => {
        return newContacts.find((contact) => contact.id === leadContact.id);
      });
      const responsibleUser = data.users.find(
        (user) => user.id === lead.responsible_user_id,
      );
      return { ...lead, contacts, responsibleUser };
    });

    const embeddedPipilines = data.pipelines.map((pipeline) => {
      const leads = embeddedLeads.filter(
        (lead) => lead.pipeline_id === pipeline.id,
      );
      return new PipelineEntity({ ...pipeline, leads });
    });

    return { ...data, pipelines: embeddedPipilines, contacts: newContacts };
  }
  async fetchLeads(getLeadsDto: GetLeadsDto) {
    const { query } = getLeadsDto;

    const defaultParams = '?with=contacts';

    const params = query
      ? `${defaultParams}&query=${query}`
      : `${defaultParams}`;

    const domain = this.configService.getOrThrow('API_DOMAIN');

    const url = `https://${domain}/api/v4/leads${params}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.getOrThrow('LONG_TERM_TOKEN')}`,
      },
    });
    const data: LeadsResponse = await res.json();

    return data._embedded.leads.map((lead) => {
      return new LeadEntity({
        id: lead.id,
        name: lead.name,
        price: lead.price,
        status_id: lead.status_id,
        responsible_user_id: lead.responsible_user_id,
        pipeline_id: lead.pipeline_id,
        created_at: lead.created_at,
        contacts: lead._embedded.contacts,
      });
    });
  }

  async fetchPipelines() {
    const domain = this.configService.getOrThrow('API_DOMAIN');
    const url = `https://${domain}/api/v4/leads/pipelines`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.getOrThrow('LONG_TERM_TOKEN')}`,
      },
    });
    const data: PipelinesResponse = await res.json();
    const pipelines = data._embedded.pipelines.map((pipeline) => ({
      id: pipeline.id,
      name: pipeline.name,
      statuses: pipeline._embedded.statuses.map(
        (status) =>
          new StatusEntity({
            id: status.id,
            name: status.name,
            color: status.color,
            pipeline_id: pipeline.id,
          }),
      ),
    }));
    return pipelines;
  }

  async fetchUsers() {
    const domain = this.configService.getOrThrow('API_DOMAIN');
    const url = `https://${domain}/api/v4/users`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.getOrThrow('LONG_TERM_TOKEN')}`,
      },
    });
    const data: UsersResponse = await res.json();
    return data._embedded.users.map((user) => new UserEntity(user));
  }

  async fetchContacts() {
    const domain = this.configService.getOrThrow('API_DOMAIN');
    const url = `https://${domain}/api/v4/contacts`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.configService.getOrThrow('LONG_TERM_TOKEN')}`,
      },
    });
    const data: ContactsResponse = await res.json();

    return data._embedded.contacts;
  }
}
