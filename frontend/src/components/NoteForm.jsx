import { useEffect, useState } from "react";

function NoteForm({ editingNote, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    onSubmit({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {editingNote ? "Edit Note" : "Create Note"}
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter note title"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-slate-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note here..."
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {editingNote ? "Update Note" : "Save Note"}
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
