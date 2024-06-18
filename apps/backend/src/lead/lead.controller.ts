import { Controller, Get } from '@nestjs/common';
import { LeadService } from "./lead.service";

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}
  @Get('/')
 async findAll() {
    return await this.leadService.fetchLeads()
  }
}
