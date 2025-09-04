import { SetMetadata } from "@nestjs/common";
import { Action } from "../enum/actions.enum";
import { Reflector } from "@nestjs/core";

export const PERMISSION_KEY = 'permission'



const accumulateMetadata = (key:string,permission:string):any => {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor?: TypedPropertyDescriptor<any>) => {
        
        const reflector = new Reflector();

        if (descriptor && descriptor.value) {
            const existingPermissions = reflector.get(key, descriptor.value) || []
            const newPermissions = [...existingPermissions, permission]
            
            SetMetadata(key,newPermissions)(target,propertyKey,descriptor)
        } else {
            const existingPermissions = reflector.get(key, target) || []
            const newPermissions = [...existingPermissions, permission]
            SetMetadata(key,newPermissions)(target)
        }
    }
}

export const Permission = (permission: string) => SetMetadata(PERMISSION_KEY, permission)



export const Create = () => {
    return accumulateMetadata(PERMISSION_KEY,Action.Create.toLocaleLowerCase())
}

export const Update = () => {
    return accumulateMetadata(PERMISSION_KEY,Action.Update.toLocaleLowerCase())
}
export const Read = () => {
    return accumulateMetadata(PERMISSION_KEY,Action.Read.toLocaleLowerCase())
}
export const Delete = () => {
    return accumulateMetadata(PERMISSION_KEY,Action.Delete.toLocaleLowerCase())
}