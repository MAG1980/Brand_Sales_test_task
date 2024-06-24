import { Controller, Get, Query } from '@nestjs/common';
import { LeadService } from '@backend/lead/lead.service';
import { GetLeadsDto } from '@backend/lead/dto/get-leads.dto';
import { ApiResponse } from '@backend/lead/interfaces/api-response.interface';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  async findAll(@Query() getLeadsDto: GetLeadsDto): Promise<ApiResponse> {
    return await this.leadService.getData(getLeadsDto);
  }
}
