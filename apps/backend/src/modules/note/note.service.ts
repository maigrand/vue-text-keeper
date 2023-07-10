import {BadRequestException, Injectable} from '@nestjs/common'
import {PrismaService} from '@/core/prisma/prisma.service'

@Injectable()
export class NoteService {

    constructor(private readonly prismaService: PrismaService) {
    }

    async create({title, content, userId}: { title: string, content: string, userId: number }) {
        const res = await this.prismaService.note.create({
            data: {
                title: title,
                content: content,
                userId: userId
            }
        })

        return res
    }

    async getAll({userId}: { userId: number }) {
        const res = await this.prismaService.note.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                id: 'asc'
            }
        })

        return res
    }

    async get({id, userId}: { id: number, userId: number }) {
        const res = await this.prismaService.note.findUnique({
            where: {
                id: id,
            }
        })

        if (res.userId !== userId) {
            throw new BadRequestException('Bad request')
        }

        return res
    }

    async update({id, title, content, userId}: { id: number, title: string, content: string, userId: number }) {
        const res = await this.prismaService.note.findUnique({
            where: {
                id: id,
            }
        })

        if (res.userId !== userId) {
            throw new BadRequestException('Bad request')
        }

        const updatedRes = await this.prismaService.note.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                content: content
            }
        })

        return updatedRes
    }

    async delete({id, userId}: { id: number, userId: number }) {
        const res = await this.prismaService.note.findUnique({
            where: {
                id: id,
            }
        })

        if (res.userId !== userId) {
            throw new BadRequestException('Bad request')
        }

        const deletedRes = await this.prismaService.note.delete({
            where: {
                id: id,
            }
        })

        return deletedRes
    }


}
