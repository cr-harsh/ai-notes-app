import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/api.js";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setError("");
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSubmit = async (noteData) => {
    try {
      setError("");

      if (editingNote) {
        const updatedNote = await updateNote(editingNote._id, noteData);
        setNotes((prev) =>
          prev.map((note) =>
            note._id === updatedNote._id ? updatedNote : note
          )
        );
        setEditingNote(null);
      } else {
        const newNote = await createNote(noteData);
        setNotes((prev) => [newNote, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));

      if (editingNote?._id === id) {
        setEditingNote(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">AI Notes App</h1>
          <p className="mt-1 text-slate-600">
            Create, edit, and delete your notes.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <NoteForm
          editingNote={editingNote}
          onSubmit={handleSubmit}
          onCancel={() => setEditingNote(null)}
        />

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Your Notes
          </h2>

          {loading ? (
            <p className="text-slate-500">Loading notes...</p>
          ) : (
            <NoteList
              notes={notes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
