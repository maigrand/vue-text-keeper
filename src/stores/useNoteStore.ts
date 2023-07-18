import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRequest } from '@/hooks/useRequest';
import { Note } from '@/types/note.type';
import { ApiException } from '@/types/exception.type';

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([]);
  const selectedNoteId = ref<number | null>(null);
  const storeApiError = ref<ApiException | null>(null);

  const selectedNote = computed(
    () => notes.value.find((item) => item.id === selectedNoteId.value) || null,
  );

  const fetchNotes = async () => {
    const { data, error } = await useRequest<Note[]>('/api/note');
    if (data.value) {
      notes.value = data.value.map((item) => {
        const updatedItem = { ...item };
        if (!updatedItem.content) {
          updatedItem.content = '';
        }
        return updatedItem;
      });
    } else if (error.value) {
      storeApiError.value = error.value;
    }
  };

  const deleteNote = async (noteId: number) => {
    const { error } = await useRequest(`/api/note/${noteId}`, null, 'DELETE');

    if (error.value) {
      storeApiError.value = error.value;
      return;
    }

    await fetchNotes();
    if (selectedNoteId?.value === noteId) {
      selectedNoteId.value = null;
    }
  };

  const addNote = async (title: string | null) => {
    if (!title) {
      return;
    }
    const body = {
      title,
      content: '',
    };
    const { data } = await useRequest<Note>('/api/note', body, 'POST');

    if (data.value) {
      notes.value.unshift(data.value);
      selectedNoteId.value = data.value.id;
    }
  };

  const updateNote = async (id:number, title:string, content:string) => {
    const body = {
      title,
      content,
    };
    const { data, error } = await useRequest<Note>(`/api/note/${id}`, body, 'PUT');

    if (error.value) {
      storeApiError.value = error.value;
      return;
    }

    if (data.value) {
      await fetchNotes();
    }
  };

  return {
    notes,
    selectedNote,
    fetchNotes,
    deleteNote,
    addNote,
    updateNote,
    selectedNoteId,
    storeApiError,
  };
});
