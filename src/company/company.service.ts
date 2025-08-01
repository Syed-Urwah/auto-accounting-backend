import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyDto, owner: User): Promise<Company> {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.address = createCompanyDto.address;
    company.owner = owner;
    return await company.save();
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}