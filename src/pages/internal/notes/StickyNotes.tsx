import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import InternalLayout from '../InternalLayout';
import { fetchNotes, addNote, deleteNote } from '../../../services/noteServices';
import { Note } from '../../../types/noteTypes';

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    const getNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        console.log('Fetched notes:', fetchedNotes);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        toast.error('Failed to fetch notes');
      }
    };
    getNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) {
      toast.error('Title and content are required');
      return;
    }
    try {
      const addedNote = await addNote(newNote);
      console.log('Added note:', addedNote);
      setNotes([addedNote, ...notes]);
      setNewNote({ title: '', content: '' });
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Failed to add note:', error);
      toast.error('Failed to add note');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    console.log('Attempting to delete note with id:', noteId);
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => (note.id || note._id) !== noteId));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <InternalLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-2 border rounded"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="w-full p-2 mb-2 border rounded"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
          <button
            onClick={handleAddNote}
            className="bg-blue-500 text-white p-2 rounded flex items-center justify-center"
          >
            <AiOutlinePlusCircle size={24} className="mr-2" />
            Add Note
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => {
            const noteId = note.id || note._id;
            return (
              <div key={noteId || `temp-${Date.now()}-${Math.random()}`} className="bg-yellow-100 p-4 rounded shadow">
                <h2 className="font-bold mb-2">{note.title}</h2>
                <p className="mb-4">{note.content}</p>
                <button
                  onClick={() => noteId && handleDeleteNote(noteId)}
                  className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                >
                  <AiOutlineDelete size={20} className="mr-2" />
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </InternalLayout>
  );
};

export default StickyNotes;