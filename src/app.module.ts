import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleController } from './example/example.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';




@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb://soniya:Jennyesha1234@ac-wztc6ue-shard-00-00.vgqh9rk.mongodb.net:27017,ac-wztc6ue-shard-00-01.vgqh9rk.mongodb.net:27017,ac-wztc6ue-shard-00-02.vgqh9rk.mongodb.net:27017/?ssl=true&replicaSet=atlas-m4ta74-shard-0&authSource=admin&retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController, ExampleController],
  providers: [AppService],
})
export class AppModule {}
