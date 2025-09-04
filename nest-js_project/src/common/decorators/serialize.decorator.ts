import { UseInterceptors } from "@nestjs/common"
import { SerializeInterceptor } from "../interceptors/serialize.interceptor"




export interface ClassConstructor{
    new (...arg:any[]):any
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}