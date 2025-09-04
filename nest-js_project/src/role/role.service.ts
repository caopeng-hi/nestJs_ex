import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRepository } from '@/user/user.repository';

@Injectable()
export class RoleService {

  constructor(
    private readonly roleDB:UserRepository
  ){}
  create(createRoleDto: CreateRoleDto) {
    return this.roleDB.getRepository().create({
      data:createRoleDto
    })
  }

  findAll(page = 1, limit = 10) {
    const skip = (page - 1) *limit
    return this.roleDB.getRepository().findAll({
      skip,
      take:limit
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
