import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetLeadsDto } from './dto/get-leads.dto';

@Injectable()
export class LeadService {
  constructor(private readonly configService: ConfigService) {}

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
    return await res.json();
  }
}
