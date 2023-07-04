import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
canActivate(
 context: ExecutionContext,
 ): boolean  {
 const request = context.switchToHttp().getRequest();
return request.session.email !== undefined;
}
}
