// import { Body, Controller, Get, Post,Req } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { User } from './schemas/cat.schema';

// @Controller('users')
// export class UsersController {
//     constructor(private userService: UsersService) {}
//     @Get()
//     getUsers(): string{
//         return 'This action returns all users'
//     }
//   @Post()
//   async createUser(
//     @Body()
//     user: any,
//   ): Promise<{token:String}> {
//     return this.userService.signUp(user);
//   }
//   @Post('login')
//   async loginUser(
//     @Body()
//     user: any,
//   ): Promise<{token:String}> {
//     return this.userService.login(user);
//   }
//   @Post('add')
//   async addtask(
//     @Body()
//     task:any,
//     @Req() req,
//   ):Promise<string[]>{
//     return this.userService.addTask(task, req);
//   }
// }


// src/users/users.controller.ts


// src/users/users.controller.ts
// import { Body, Controller, Get, Post, Req,Res } from '@nestjs/common';
// import { UsersService } from './users.service';
// //import { JwtAuthGuard } from './auth/jwt-auth.guard'
// @Controller('users')
// export class UsersController {
//   constructor(private userService: UsersService) {}

//   @Get()
//   getUsers(): string {
//     return 'This action returns all users';
//   }

//   @Post()
//   async createUser(@Body() user: any): Promise<{ token: string }> {
//     const result = await this.userService.signUp(user);
//     return { token: result.token as string }; // Ensure result.token is treated as a string
//   }

//   // @Post('login')
//   // async loginUser(@Body() user: any): Promise<{ token: string }> {
//   //   const result = await this.userService.login(user);
//   //   return { token: result.token as string }; // Ensure result.token is treated as a string
//   // }

//   @Post('login')
//   async loginUser(@Body() user: any, @Res() res): Promise<void> {
//     try {
//       const result = await this.userService.login(user);
//       // Assuming login is successful, you can set a token in the response header or body
//       res.status(200).json({ token: result.token });
//     } catch (error) {
//       // Handle login error
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   }

//   @Post('add')
//   async addTask(@Body() task: any, @Req() req): Promise<string[]> {
//     return this.userService.addTask(task, req);
//   }
// }



// src/users/users.controller.ts
// import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @Controller('users')
// export class UsersController {
//   constructor(private userService: UsersService) {}

//   @Get()
//   getUsers(): string {
//     return 'This action returns all users';
//   }

//   @Post()
//   async createUser(@Body() user: any): Promise<{ token: string }> {
//     const result = await this.userService.signUp(user);
//     return { token: result.token as string }; // Ensure result.token is treated as a string
//   }

//   @Post('login')
//   async loginUser(@Body() user: any, @Res() res): Promise<void> {
//     try {
//       const result = await this.userService.login(user);
//       // Assuming login is successful, you can set a token in the response header or body
//       res.status(200).json({ token: result.token });
//     } catch (error) {
//       // Handle login error
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   }

//   // @UseGuards(JwtAuthGuard) // Protect this route with JWTAuthGuard
//   // @Post('addTask')
//   // async addTask(@Body() task: any, @Req() req): Promise<string[]> {
//   //   try {
//   //     const updatedTasks = await this.userService.addTask(task, req.user);
//   //     return updatedTasks;
//   //   } catch (error) {
//   //     throw new Error('Failed to add task');
//   //   }
//   // }

//   // UsersController.ts
// @Post('addTask')
// async addTask(@Body() task: any, @Req() req): Promise<string[]> {
//   try {
//     const updatedTasks = await this.userService.addTask(task, req.user);
//     return updatedTasks;
//   } catch (error) {
//     throw new Error('Failed to add task');
//   }
// }

// }

import { Body, Controller, Get, Post, Req, Res, UseGuards, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): string {
    return 'This action returns all users';
  }

  @Post()
  async createUser(@Body() user: any): Promise<{ token: string }> {
    const result = await this.userService.signUp(user);
    return { token: result.token as string }; // Ensure result.token is treated as a string
  }

  @Post('login')
  async loginUser(@Body() user: any, @Res() res): Promise<void> {
    try {
      const result = await this.userService.login(user);
      // Assuming login is successful, you can set a token in the response header or body
      res.status(200).json({ token: result.token });
    } catch (error) {
      // Handle login error
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  @UseGuards(JwtAuthGuard) // Protect this route with JWTAuthGuard
  @Get('tasks')
  async getTasks(@Req() req): Promise<string[]> {
    try {
      const tasks = await this.userService.getTasks(req.user);
      return tasks;
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  }

  @UseGuards(JwtAuthGuard) // Protect this route with JWTAuthGuard
  @Post('addTask')
  async addTask(@Body() task: any, @Req() req): Promise<string[]> {
    try {
      const updatedTasks = await this.userService.addTask(task, req.user);
      return updatedTasks;
    } catch (error) {
      throw new Error('Failed to add task');
    }
  }

  @UseGuards(JwtAuthGuard) // Protect this route with JWTAuthGuard
  @Delete('deleteTask/:index')
  async deleteTask(@Param('index') index: string, @Req() req): Promise<string[]> {
    try {
      const updatedTasks = await this.userService.deleteTask(parseInt(index, 10), req.user);
      return updatedTasks;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
}

