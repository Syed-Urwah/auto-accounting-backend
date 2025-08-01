import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { apiResponse } from '../common/helpers/response.helper';
import { SignUpDto } from './dto/signup.dto';
import { CompanyService } from '../company/company.service';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private companyService: CompanyService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = {email: user.email, username: user.username, sub: user.id, roles: user.roles};
    const token = this.jwtService.sign(payload);
    return apiResponse(HttpStatus.OK, 'Login successful', { access_token: token });
  }

  @Transactional()
  async signup(signUpDto: SignUpDto) {
    const newUser = await this.userService.create(signUpDto.email, signUpDto.username, signUpDto.password);
    const createCompanyDto: CreateCompanyDto = { name: signUpDto.companyName, address: signUpDto.companyAddress };
    const company = await this.companyService.create(createCompanyDto, newUser);
    newUser.company = company;
    await newUser.save();
    const { password, ...userResult } = newUser;
    const result = {
      ...userResult,
      company: {
        id: company.id,
        name: company.name,
        address: company.address,
      },
    };
    return apiResponse(HttpStatus.CREATED, 'Signup successful', result);
  }
}

