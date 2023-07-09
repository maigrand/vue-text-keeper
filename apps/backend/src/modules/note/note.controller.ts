import {Body, Controller, Get, HttpCode, Param, Post, Put, Req, UseInterceptors} from '@nestjs/common'
import {NoteService} from '@/modules/note/note.service'
import {AuthInterceptor} from '@/interceptors/auth.interceptor'

@UseInterceptors(AuthInterceptor)
@Controller('/api/note')
export class NoteController {
    constructor(
        private readonly noteService: NoteService,
    ) {
    }

    @Get()
    public async getAll(@Req() req: Request) {
        const notes = await this.noteService.getAll({userId: req['userId']})
        return notes
    }

    @Get('/:id')
    public async get(@Req() req: Request, @Param('id') noteId: number) {
        const note = await this.noteService.get({id: Number(noteId), userId: req['userId']})
        return note
    }

    @Post()
    @HttpCode(201)
    public async create(
        @Req() req: Request,
        @Body() body: { title: string, content: string }) {
        const note = await this.noteService.create({
            title: body.title,
            content: body.content,
            userId: req['userId']
        })
        return note
    }

    @Put('/:id')
    public async update(
        @Req() req: Request,
        @Param('id') noteId: number,
        @Body() body: { title: string, content: string }) {
        const note = await this.noteService.update({
            id: Number(noteId),
            title: body.title,
            content: body.content,
            userId: req['userId']
        })
        return note
    }
}