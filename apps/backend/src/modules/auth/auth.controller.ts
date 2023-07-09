import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'

@Controller('/api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/signin')
    @HttpCode(200)
    public async signin(@Body() data: { email: string, password: string }) {
        const token = await this.authService.signin(data)
        return {
            token,
            tokenType: 'Bearer'
        }
    }

    @Post('/signup')
    @HttpCode(201)
    public async signup(@Body() data: { email: string, password: string }) {
        const token = await this.authService.signup(data)
        return {
            token,
            tokenType: 'Bearer'
        }
    }
}