import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LeadService {
  constructor(private readonly configService: ConfigService) {}

  async fetchLeads() {
    const domain =
      this.configService.getOrThrow('API_DOMAIN')
    console.log({domain})
    const url = `https://${domain}/api/v4/leads`

    const res = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.configService.getOrThrow('LONG_TERM_TOKEN')}`
      }
    })
    return await res.json()
  }
}
