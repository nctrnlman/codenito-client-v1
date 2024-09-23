import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import InternalLayout from '../InternalLayout';
import { fetchNotes, addNote, deleteNote } from '../../../services/noteServices';
import { Note } from '../../../types/noteTypes';

const StickyNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
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
      setNotes([addedNote, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsAddingNote(false);
      toast.success('Note added successfully');
    } catch (error) {
      console.error('Failed to add note:', error);
      toast.error('Failed to add note');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => (note.id || note._id) !== noteId));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note');
    }
  };

  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  const handleNoteClick = (note: Note) => {
    setPreviewNote(note);
  };

  const closePreview = () => {
    setPreviewNote(null);
  };

  return (
    <InternalLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
        <button
          onClick={() => setIsAddingNote(true)}
          className="bg-blue-500 text-white p-2 rounded flex items-center justify-center mb-4"
        >
          <AiOutlinePlusCircle size={24} className="mr-2" />
          Add Note
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => {
            const noteId = note.id || note._id;
            return (
              <div 
                key={noteId || `temp-${Date.now()}-${Math.random()}`} 
                className="bg-yellow-100 p-4 rounded shadow cursor-pointer transition-all duration-300 hover:shadow-lg relative h-48"
                onClick={() => handleNoteClick(note)}
              >
                <h2 className="font-bold mb-2 text-lg pr-8">{note.title}</h2>
                <div className="overflow-y-auto h-28 mb-2">
                  <p className="whitespace-pre-wrap break-words">{truncateContent(note.content, 25)}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    noteId && handleDeleteNote(noteId);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            );
          })}
        </div>
        {isAddingNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={() => setIsAddingNote(false)}>
            <div 
              className="bg-white p-6 rounded shadow-lg max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Add New Note</h2>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 mb-2 border rounded"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                className="w-full p-2 mb-2 border rounded min-h-[200px]"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="bg-gray-300 text-black p-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
        {previewNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={closePreview}>
            <div 
              className="bg-yellow-100 p-6 rounded shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{previewNote.title}</h2>
              <div className="mb-4 flex-grow overflow-y-auto">
                <p className="whitespace-pre-wrap break-words">{previewNote.content}</p>
              </div>
              <button
                onClick={closePreview}
                className="bg-blue-500 text-white p-2 rounded self-end"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </InternalLayout>
  );
};

export default StickyNotes;