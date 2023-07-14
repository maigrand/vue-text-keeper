import { Note, ApiException } from '@/types/commonTypes';

export type NoteState = {
    data: Note | null,
    error: ApiException | null,
}

export type NoteProps = {
    id: number,
}
