const API_URL = "/api/notes";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function fetchNotes() {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  return data.data;
}

export async function createNote(note) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  const data = await handleResponse(response);
  return data.data;
}

export async function updateNote(id, note) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  const data = await handleResponse(response);
  return data.data;
}

export async function deleteNote(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  await handleResponse(response);
}

export async function summarizeNote(content) {
  const response = await fetch("/api/ai/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data = await handleResponse(response);
  return data.summary;
}
