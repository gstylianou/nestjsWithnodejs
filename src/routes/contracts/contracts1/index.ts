import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import {Controller, Get, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiSecurity('basic')
@Controller('contracts/contracts1')
export class Contracts1Controller {

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  findAll(): string {
    return 'This action returns contracts/contracts1';
  }
}