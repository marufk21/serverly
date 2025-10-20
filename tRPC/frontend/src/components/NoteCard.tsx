import React from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{note.title}</h3>
        <div className="space-x-2">
          <button 
            onClick={() => onEdit(note)} 
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(note.id)} 
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
      <div className="text-xs text-gray-500 mt-2">
        Updated: {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};