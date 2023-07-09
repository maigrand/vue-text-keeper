import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { PrismaService } from '@/core/prisma/prisma.service'
//import { fastifyCookie } from '@fastify/cookie'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    )

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    })

    // await app.register(fastifyCookie, {
    //     secret: AppModule.cookieSecret
    // })

    const prismaService = app.get(PrismaService)
    await prismaService.enableShutdownHooks(app)

    await app.listen(AppModule.port)
    console.log(`Started in port: ${AppModule.port}`)
}
bootstrap()
