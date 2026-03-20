const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("portfolio_admin_token");
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  login: (username, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),

  // Projects
  getProjects:    ()          => request("/api/projects"),
  getAllProjects:  ()          => request("/api/projects/all"),
  addProject:     (data)      => request("/api/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject:  (id, data)  => request(`/api/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleProject:  (id)        => request(`/api/projects/${id}/toggle`, { method: "PATCH" }),
  deleteProject:  (id)        => request(`/api/projects/${id}`, { method: "DELETE" }),

  // Skills
  getSkills:    ()          => request("/api/skills"),
  getAllSkills:  ()          => request("/api/skills/all"),
  addSkill:     (data)      => request("/api/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill:  (id, data)  => request(`/api/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleSkill:  (id)        => request(`/api/skills/${id}/toggle`, { method: "PATCH" }),
  deleteSkill:  (id)        => request(`/api/skills/${id}`, { method: "DELETE" }),

  // Experience
  getExperience:    ()          => request("/api/experience"),
  getAllExperience:  ()          => request("/api/experience/all"),
  addExperience:    (data)      => request("/api/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data)  => request(`/api/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleExperience: (id)        => request(`/api/experience/${id}/toggle`, { method: "PATCH" }),
  deleteExperience: (id)        => request(`/api/experience/${id}`, { method: "DELETE" }),

  // Freelance
  getFreelance:    ()          => request("/api/freelance"),
  getAllFreelance:  ()          => request("/api/freelance/all"),
  addFreelance:    (data)      => request("/api/freelance", { method: "POST", body: JSON.stringify(data) }),
  updateFreelance: (id, data)  => request(`/api/freelance/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  toggleFreelance: (id)        => request(`/api/freelance/${id}/toggle`, { method: "PATCH" }),
  deleteFreelance: (id)        => request(`/api/freelance/${id}`, { method: "DELETE" }),
};
