import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(30, { message: 'Name must be at most 30 characters' })
  username: string;

  @IsNotEmpty()
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(3, { message: 'Password must be at least 3 characters' })
  @MaxLength(20, { message: 'Password must be at most 20 characters' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
