import React from 'react';
import { NoteCard } from './NoteCard';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};