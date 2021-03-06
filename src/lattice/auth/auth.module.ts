import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { Registrant } from '../registrant.entity';
import { User } from '../user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const secretKey = process.env.LATTICE_SECRET_KEY;

@Module({
  imports: [
    TypeOrmModule.forFeature([Registrant, User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({ secret: secretKey }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, EmailService],
  exports: [PassportModule],
})
export class AuthModule {}
