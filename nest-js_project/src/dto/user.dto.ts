import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString,Length,} from 'class-validator'

export class SignUserDto { 

    @IsString()
    @IsNotEmpty()
    @Length(6, 20, {
        message:'用户长度不正确'
    })
    username: string
    
     @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string
    
    @IsArray()
    @IsOptional() 
    @IsNumber({}, { each: true })
    roles:[]

}