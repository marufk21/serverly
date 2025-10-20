"use client";

import { useState } from "react";
import { useNotes, useDeleteNote } from "@/hooks/useNotes";
import { NotesList } from "@/components/notes_list";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { notes, loading, error } = useNotes();
  const { deleteNote } = useDeleteNote();
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote({ variables: { id } });
      } catch (err) {
        console.error("Error deleting note:", err);
        alert("Failed to delete note");
      }
    }
  };

  const handleAddNote = () => {
    router.push("/add");
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notes</h1>
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>
      <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
