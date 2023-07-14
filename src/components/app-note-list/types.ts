import { Note, ApiException } from '@/types/commonTypes';

export type NoteListState = {
    data: Note[],
    error: ApiException | null,
}

export interface NoteListEmits {
    (event: 'set-selected', taskId: number): void
}
