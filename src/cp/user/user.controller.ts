import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  find() {
    return this.userService.findAll();
  }
}
