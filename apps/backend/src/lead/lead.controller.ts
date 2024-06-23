import { Controller, Get, Query } from '@nestjs/common';
import { LeadService } from '@backend/lead/lead.service';
import { GetLeadsDto } from '@backend/lead/dto/get-leads.dto';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}
  @Get()
  async findAll(@Query() getLeadsDto: GetLeadsDto) {
    const data = await this.leadService.getData(getLeadsDto);
    return data;
  }
}
