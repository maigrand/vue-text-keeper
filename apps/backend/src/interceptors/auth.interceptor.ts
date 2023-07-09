import {CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor} from '@nestjs/common'
import {Observable} from 'rxjs'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthInterceptor implements NestInterceptor {

    constructor(private readonly jwtService: JwtService) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest()
        const authorizationHeader = request.headers['authorization']
        const token = authorizationHeader?.split(/\s/)[1]

        if (token) {
            try {
                const jwtToken = this.jwtService.verify(token)
                if (jwtToken) {
                    request.userId = jwtToken.userId
                    return next.handle()
                }
            } catch (e) {
                throw new ForbiddenException('Invalid token')
            }
        }

        throw new ForbiddenException('No token provided')
    }
}