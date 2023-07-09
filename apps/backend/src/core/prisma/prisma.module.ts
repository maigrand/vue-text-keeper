import {Global, Module} from '@nestjs/common'
import {PrismaService} from '@/core/prisma/prisma.service'

@Global()
@Module({
    imports: [],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
