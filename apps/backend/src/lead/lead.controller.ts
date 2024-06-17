import { Controller, Get } from '@nestjs/common';

@Controller('leads')
export class LeadController {
  @Get('/')
  findAll() {
    return 'All leads';
  }
}
