import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {CoreModule} from '@/core/core.module'
import {AuthModule} from '@/modules/auth/auth.module'
import {NoteModule} from '@/modules/note/note.module'
import {JwtModule} from '@nestjs/jwt'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_KEY'),
            }),
            inject: [ConfigService],
            global: true,
        }),
        CoreModule,
        AuthModule,
        NoteModule,
    ]
})
export class AppModule {
    static port: number
    constructor(configService: ConfigService) {
        AppModule.port = configService.get('PORT')
    }
}