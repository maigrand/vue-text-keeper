import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ApiException, Note } from '@/types/commonTypes';
import { useRequest } from '@/hooks/useRequest';

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
      notes.value = data.value;
    } else if (error.value) {
      storeApiError.value = error.value;
    }
  };

  const deleteNote = async (noteId: number) => {
    // notes.value = notes.value.filter((item) => item.id !== noteId);
    // if (selectedNoteId?.value === noteId) {
    //   selectedNoteId.value = null;
    // }
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
      // notes.value = notes.value.map((item) => {
      //   if (item.id === data.value?.id) {
      //     return data.value;
      //   }
      //   return item;
      // });
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
