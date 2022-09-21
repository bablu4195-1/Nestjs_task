/* eslint-disable prettier/prettier */
import { ExtractJwt,Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Jwtpayload } from './jwt-payload.interface';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
    ){
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: Jwtpayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
