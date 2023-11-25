

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
//

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>,
//     private jwtService: JwtService,
//   ) {}
//   async signUp(user: User): Promise<{ token: String }> {
//     const { name, email, password } = user;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const userData = await this.userModel.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const token = this.jwtService.sign({ id: userData._id });

//     return { token };
//   }
//   async create(user: User): Promise<User> {
//     const res = await this.userModel.create(user);
//     return res;
//   }

//   async login(user: User): Promise<{ token: string }> {
//     const { email, password } = user;
//     const userData = await this.userModel.findOne({ email });

//     if (!userData) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const isPasswordMatched = await bcrypt.compare(
//       password,
//       userData.password as string,
//     );

//     if (!isPasswordMatched) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const token = this.jwtService.sign({ id: userData._id });

//     return { token };
//   }

//   async addTask(data: any, user: any): Promise<string[]> {
//     const { task } = data;
//     user.tasks = user.tasks || [];
    
//     user.tasks.push(task);
  
    
//     await this.userModel.updateOne({ _id: user._id }, { tasks: user.tasks });
  
    
//     return user.tasks;
//   }

//   someMethod(): string[] {
//     return ['task1', 'task2'];
//   }
// }
// src/users/users.service.ts
// 


// users.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/cat.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  getTasks(user: any): string[] {
    return user.tasks || [];
  }

  addTask(data: any, user: any): Promise<string[]> {
    const { task } = data;
    user.tasks = user.tasks || [];
    user.tasks.push(task);
    return this.updateUserTasks(user);
  }

  deleteTask(index: number, user: any): Promise<string[]> {
    if (index >= 0 && index < user.tasks.length) {
      user.tasks.splice(index, 1);
      return this.updateUserTasks(user);
    }
    return Promise.resolve(user.tasks || []);
  }

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async signUp(user: User): Promise<{ token: string }> {
    const { name, email, password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: userData._id });

    return { token };
  }

  async login(user: User): Promise<{ token: string }> {
    const { email, password } = user;
    const userData = await this.userModel.findOne({ email });

    if (!userData) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userData.password as string,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: userData._id });

    return { token };
  }

  private async updateUserTasks(user: any): Promise<string[]> {
    await this.userModel.updateOne({ _id: user._id }, { tasks: user.tasks });
    return user.tasks;
  }

  someMethod(): string[] {
    return ['task1', 'task2'];
  }
}
