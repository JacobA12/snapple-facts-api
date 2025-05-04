const API_URL = "http://localhost:3000/api";

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "something went wrong");
  }

  return response.json();
}

export async function login(credentials) {
  const reponse = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}
