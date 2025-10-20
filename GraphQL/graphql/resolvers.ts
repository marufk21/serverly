let notes: any[] = [
  {
    id: "1",
    title: "Welcome to GraphQL Notes",
    content: "This is your first note!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 2;

export const resolvers = {
  Query: {
    notes: () => notes,
    note: (_: any, { id }: { id: string }) =>
      notes.find((note) => note.id === id),
  },
  Mutation: {
    createNote: (
      _: any,
      { title, content }: { title: string; content: string }
    ) => {
      const newNote = {
        id: String(nextId++),
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      notes.push(newNote);
      return newNote;
    },
    updateNote: (
      _: any,
      { id, title, content }: { id: string; title?: string; content?: string }
    ) => {
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
    deleteNote: (_: any, { id }: { id: string }) => {
      const noteIndex = notes.findIndex((note) => note.id === id);
      if (noteIndex === -1) {
        return false;
      }

      notes.splice(noteIndex, 1);
      return true;
    },
  },
};
