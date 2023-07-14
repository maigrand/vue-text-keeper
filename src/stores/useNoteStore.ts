import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Note } from '@/types/commonTypes';
import { useRequest } from '@/hooks/useRequest';

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([]);

  const selectedNote = ref<Note | null>(null);

  const setSelectedNote = (note: Note) => {
    selectedNote.value = note;
    notes.value = notes.value.map((item) => {
      if (item.id === note.id) {
        return note;
      }
      return item;
    });
  };

  const deleteNote = (noteId: number) => {
    notes.value = notes.value.filter((item) => item.id !== noteId);
    if (selectedNote?.value?.id === noteId) {
      selectedNote.value = null;
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
      setSelectedNote(data.value);
    }
  };

  return {
    notes,
    selectedNote,
    setSelectedNote,
    deleteNote,
    addNote,
  };
});
