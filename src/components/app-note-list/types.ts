import { Note, ApiException } from '@/types/commonTypes';

export type NoteListState = {
    data: Note[],
    error: ApiException | null,
}
