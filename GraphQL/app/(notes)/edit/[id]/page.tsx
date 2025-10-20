"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NoteForm } from "@/components/note_form";
import { useNotes, useUpdateNote } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";

export default function EditNotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { notes, loading: notesLoading } = useNotes();
  const { updateNote, loading: updateLoading } = useUpdateNote();
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    if (notes && params.id) {
      const foundNote = notes.find((n) => n.id === params.id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        // Note not found, redirect to home
        router.push("/");
      }
    }
  }, [notes, params.id, router]);

  const handleSubmit = async (title: string, content: string) => {
    try {
      await updateNote({ variables: { id: params.id, title, content } });
      router.push("/");
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  if (notesLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!note) {
    return <div className="container mx-auto py-8">Note not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Note</h1>
        <Button variant="outline" onClick={handleCancel}>
          Back
        </Button>
      </div>
      <div className="max-w-2xl mx-auto">
        <NoteForm note={note} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
