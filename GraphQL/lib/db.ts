// For now, we'll use an in-memory database
// In a production app, you would connect to a real database like PostgreSQL or MongoDB

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

let notes: Note[] = [
  {
    id: "1",
    title: "Welcome to GraphQL Notes",
    content: "This is your first note!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 2;

export const db = {
  getAllNotes: (): Note[] => notes,
  getNoteById: (id: string): Note | undefined =>
    notes.find((note) => note.id === id),
  createNote: (title: string, content: string): Note => {
    const newNote: Note = {
      id: String(nextId++),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    return newNote;
  },
  updateNote: (id: string, title?: string, content?: string): Note => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error("Note not found");
    }

    const updatedNote = {
      ...notes[noteIndex],
      title: title ?? notes[noteIndex].title,
      content: content ?? notes[noteIndex].content,
      updatedAt: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;
    return updatedNote;
  },
  deleteNote: (id: string): boolean => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return false;
    }

    notes.splice(noteIndex, 1);
    return true;
  },
};
