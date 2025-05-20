import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
// Ensure you have the correct MongoDB URI
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    UserModule,
    AuthenticationModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
