import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetLeadsDto } from '@backend/lead/dto/get-leads.dto';
import {
  LeadsResponse,
  PipelinesResponse,
  UsersResponse,
} from '@backend/lead/interfaces';

@Injectable()
export class LeadService {
  constructor(private readonly configService: ConfigService) {}

  async getData(getLeadsDto: GetLeadsDto) {
    const leads = await this.fetchLeads(getLeadsDto);
    const pipelines = await this.fetchPipelines();
    const users = await this.fetchUsers();
    return { leads, pipelines, users };
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

    return data._embedded;
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
    return data;
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
    return data._embedded;
  }
}
