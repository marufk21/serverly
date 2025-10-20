import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './utils/trpc';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import { useNotes } from './hooks/useNotes';

// Create a client
const queryClient = new QueryClient();

// Temporary user ID for demo purposes
const DEMO_USER_ID = 'user123';

interface Note {
  id?: string;
  title: string;
  content: string;
  userId?: string;
}

function NotesApp() {
  const { getAllNotes, createNote, updateNote, deleteNote } = useNotes();
  const { data: notes, isLoading, error } = getAllNotes;
  
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateNote = (note: Note) => {
    createNote.mutate({
      ...note,
      userId: DEMO_USER_ID,
    }, {
      onSuccess: () => {
        setIsFormVisible(false);
      }
    });
  };

  const handleUpdateNote = (note: Note) => {
    if (note.id) {
      updateNote.mutate({
        id: note.id,
        title: note.title,
        content: note.content,
      }, {
        onSuccess: () => {
          setEditingNote(null);
        }
      });
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote.mutate({ id });
    }
  };

  const handleEditClick = (note: any) => {
    setEditingNote(note);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setEditingNote(null);
    setIsFormVisible(false);
  };

  if (isLoading) return <div className="text-center py-10">Loading notes...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading notes: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Notes App</h1>
      </header>

      <div className="mb-6">
        {!isFormVisible ? (
          <button
            onClick={() => setIsFormVisible(true)}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            + New Note
          </button>
        ) : (
          <NoteForm
            initialNote={editingNote || undefined}
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={handleCancelForm}
          />
        )}
      </div>

      <NoteList
        notes={notes || []}
        onEdit={handleEditClick}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NotesApp />
      </QueryClientProvider>
    </trpc.Provider>
  );
}