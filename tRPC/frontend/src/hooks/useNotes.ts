import { trpc } from '../utils/trpc';

export const useNotes = () => {
  const utils = trpc.useContext();
  
  // Query to get all notes
  const getAllNotes = trpc.notes.getAll.useQuery();
  
  // Query to get a note by ID
  const getNote = (id: string) => {
    return trpc.notes.getById.useQuery({ id });
  };
  
  // Mutation to create a new note
  const createNote = trpc.notes.create.useMutation({
    onSuccess: () => {
      utils.notes.getAll.invalidate();
    },
  });
  
  // Mutation to update a note
  const updateNote = trpc.notes.update.useMutation({
    onSuccess: () => {
      utils.notes.getAll.invalidate();
    },
  });
  
  // Mutation to delete a note
  const deleteNote = trpc.notes.delete.useMutation({
    onSuccess: () => {
      utils.notes.getAll.invalidate();
    },
  });
  
  return {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
  };
};