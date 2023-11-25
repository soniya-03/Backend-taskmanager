import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './schemas/cat.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' },
  }),],
  controllers: [UsersController],   
  providers: [UsersService]
  
})
export class UsersModule {}
