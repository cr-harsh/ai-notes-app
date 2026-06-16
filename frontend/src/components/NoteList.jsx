import { useState } from "react";
import { summarizeNote } from "../services/api.js";

function NoteList({ notes, onEdit, onDelete }) {
  const [summaries, setSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});
  const [summaryErrors, setSummaryErrors] = useState({});

  const handleSummarize = async (note) => {
    try {
      setSummaryErrors((prev) => ({ ...prev, [note._id]: "" }));
      setLoadingSummary((prev) => ({ ...prev, [note._id]: true }));

      const summary = await summarizeNote(note.content);
      setSummaries((prev) => ({ ...prev, [note._id]: summary }));
    } catch (err) {
      setSummaryErrors((prev) => ({ ...prev, [note._id]: err.message }));
    } finally {
      setLoadingSummary((prev) => ({ ...prev, [note._id]: false }));
    }
  };

  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No notes yet. Create your first note above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <article
          key={note._id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                {note.title}
              </h3>
              <p className="mt-2 whitespace-pre-wrap text-slate-600">
                {note.content}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                {new Date(note.createdAt).toLocaleString()}
              </p>

              {summaries[note._id] && (
                <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    AI Summary
                  </p>
                  <p className="mt-1 text-sm text-indigo-900">
                    {summaries[note._id]}
                  </p>
                </div>
              )}

              {summaryErrors[note._id] && (
                <p className="mt-3 text-sm text-red-600">
                  {summaryErrors[note._id]}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => handleSummarize(note)}
                disabled={loadingSummary[note._id]}
                className="rounded-lg border border-indigo-200 px-3 py-1.5 text-sm text-indigo-700 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingSummary[note._id] ? "Summarizing..." : "Summarize"}
              </button>
              <button
                type="button"
                onClick={() => onEdit(note)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(note._id)}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default NoteList;
