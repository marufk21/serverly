"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/note_form";
import { useCreateNote } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";

export default function AddNotePage() {
  const router = useRouter();
  const { createNote, loading } = useCreateNote();

  const handleSubmit = async (title: string, content: string) => {
    try {
      await createNote({ variables: { title, content } });
      router.push("/");
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to create note");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add Note</h1>
        <Button variant="outline" onClick={handleCancel}>
          Back
        </Button>
      </div>
      <div className="max-w-2xl mx-auto">
        <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
