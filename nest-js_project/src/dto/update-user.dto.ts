import { PartialType } from '@nestjs/mapped-types';
import { SignUserDto } from './user.dto';
import { IsArray,  IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateUserDto extends PartialType(SignUserDto) {


    @IsInt()
    @IsOptional()
    id: number
    

    @IsArray()
    @Type(() => SignUserDto)
    roles:any[]
    
}