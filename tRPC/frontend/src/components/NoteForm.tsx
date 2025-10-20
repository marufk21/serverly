import React, { useState, useEffect } from 'react';

interface Note {
  id?: string;
  title: string;
  content: string;
}

interface NoteFormProps {
  initialNote?: Note;
  onSubmit: (note: Note) => void;
  onCancel: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ 
  initialNote, 
  onSubmit, 
  onCancel 
}) => {
  const [note, setNote] = useState<Note>({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (initialNote) {
      setNote(initialNote);
    }
  }, [initialNote]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(note);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={note.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={note.content}
          onChange={handleChange}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {initialNote ? 'Update' : 'Create'} Note
        </button>
      </div>
    </form>
  );
};