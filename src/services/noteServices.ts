import axios from 'axios';
import { Note, NewNote } from '../types/noteTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${API_URL}/notes`, { headers });
    return response.data.data.notes;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};

export const addNote = async (newNote: NewNote): Promise<Note> => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${API_URL}/notes`, newNote, { headers });
    return response.data.data.note;
  } catch (error) {
    console.error('Failed to add note:', error);
    throw error;
  }
};

export const updateNote = async (id: string, updatedNote: Partial<NewNote>): Promise<Note> => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.put(`${API_URL}/notes/${id}`, updatedNote, { headers });
    return response.data.data.note;
  } catch (error) {
    console.error('Failed to update note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.delete(`${API_URL}/notes/${id}`, { headers });
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw error;
  }
};