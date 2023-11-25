// src/auth/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'passport-jwt';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
