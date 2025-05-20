import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.finduserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
