"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "@/lib/graphql";
import { Note } from "@/types/note";

export const useNotes = () => {
  const { data, loading, error, refetch } = useQuery<{ notes: Note[] }>(
    GET_NOTES
  );

  return {
    notes: data?.notes || [],
    loading,
    error,
    refetch,
  };
};

export const useCreateNote = () => {
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  return {
    createNote,
    loading,
    error,
  };
};

export const useUpdateNote = () => {
  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  return {
    updateNote,
    loading,
    error,
  };
};

export const useDeleteNote = () => {
  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  return {
    deleteNote,
    loading,
    error,
  };
};
