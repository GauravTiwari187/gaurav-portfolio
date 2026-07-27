const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("admin_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with ${res.status}`);
  }
  return data;
}

export const api = {
  getProfile: () => request("/profile"),
  updateProfile: (body) =>
    request("/profile", { method: "PUT", body: JSON.stringify(body) }),

  getCertificates: () => request("/certificates"),
  createCertificate: (body) =>
    request("/certificates", { method: "POST", body: JSON.stringify(body) }),
  updateCertificate: (id, body) =>
    request(`/certificates/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteCertificate: (id) => request(`/certificates/${id}`, { method: "DELETE" }),

  getProjects: () => request("/projects"),
  createProject: (body) =>
    request("/projects", { method: "POST", body: JSON.stringify(body) }),
  updateProject: (id, body) =>
    request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),

  search: (q) => request(`/search?q=${encodeURIComponent(q)}`),

  askAI: (question) =>
    request("/ai/ask", { method: "POST", body: JSON.stringify({ question }) }),

  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
};

export default api;
