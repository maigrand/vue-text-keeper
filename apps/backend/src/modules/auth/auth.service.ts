import {Injectable} from '@nestjs/common'
import {PrismaService} from '@/core/prisma/prisma.service'
import {JwtService} from '@nestjs/jwt'
import {randomBytes, scrypt} from 'crypto'

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signin({email, password}: { email: string, password: string }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('Bad request')
        }

        const verify = await this.verifyPasswordHash(password, user.password)
        if (!verify) {
            throw new Error('Bad request')
        }

        const token = this.jwtService.sign({
            email: email,
            userId: user.id,
        })

        return token
    }

    async signup({email, password}: { email: string, password: string }) {
        const passwordSalt = this.createPasswordSalt()
        const passwordHash = await this.createPasswordHash(password, passwordSalt)

        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        if (user) {
            throw new Error('Bad request')
        }

        const createdUser = await this.prismaService.user.create({
            data: {
                email: email,
                password: passwordHash,
            }
        })

        const token = this.jwtService.sign({
            email: email,
            userId: createdUser.id,
        })

        return token
    }

    private createPasswordSalt() {
        return randomBytes(16).toString('hex')
    }

    private async createPasswordHash(password: string, salt: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            scrypt(password, salt, 64, (err, key) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(salt + ':' + key.toString('hex'))
                }
            })
        })
    }

    private async verifyPasswordHash(password: string, passwordHash: string) {
        const [salt, _] = passwordHash.split(':')
        return passwordHash === await this.createPasswordHash(password, salt)
    }
}
