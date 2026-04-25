import { useState } from "react";
import { api } from "../../lib/api";

const FIELDS = {
  projects: [
    { key: "title",       label: "Title",                        type: "text" },
    { key: "description", label: "Description",                  type: "textarea" },
    { key: "tech",        label: "Tech (comma separated)",       type: "text", isArray: true },
    { key: "github",      label: "GitHub URL",                   type: "text" },
    { key: "live",        label: "Live URL",                     type: "text" },
    { key: "image_url",   label: "Screenshot URL (Cloudinary / any direct image link)", type: "text" },
    { key: "featured",    label: "Featured",                     type: "checkbox" },
  ],
  skills: [
    { key: "name",     label: "Name",     type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "level",    label: "Level",    type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    { key: "details",  label: "Details",  type: "textarea" },
  ],
  experience: [
    { key: "role",     label: "Role",                  type: "text" },
    { key: "company",  label: "Company",               type: "text" },
    { key: "duration", label: "Duration",              type: "text" },
    { key: "type",     label: "Type",                  type: "select", options: ["internship", "leadership"] },
    { key: "points",   label: "Points (one per line)", type: "textarea", isLineArray: true },
  ],
  freelance: [
    { key: "tag",         label: "Tag (e.g. 01)", type: "text" },
    { key: "title",       label: "Title",         type: "text" },
    { key: "description", label: "Description",   type: "textarea" },
  ],
};

const ADD_APIS = { projects: api.addProject,    skills: api.addSkill,    experience: api.addExperience,    freelance: api.addFreelance };
const UPD_APIS = { projects: api.updateProject, skills: api.updateSkill, experience: api.updateExperience, freelance: api.updateFreelance };
const TOG_APIS = { projects: api.toggleProject, skills: api.toggleSkill, experience: api.toggleExperience, freelance: api.toggleFreelance };
const DEL_APIS = { projects: api.deleteProject, skills: api.deleteSkill, experience: api.deleteExperience, freelance: api.deleteFreelance };

const sharedInputStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text)",
  fontSize: "16px", // prevents iOS zoom
};

function ItemForm({ section, initial = {}, onSave, onCancel }) {
  const fields = FIELDS[section];
  const [form, setForm] = useState(() => {
    const f = {};
    fields.forEach(({ key, type, isArray, isLineArray }) => {
      if (type === "checkbox")  f[key] = initial[key] || false;
      else if (isArray)         f[key] = (initial[key] || []).join(", ");
      else if (isLineArray)     f[key] = (initial[key] || []).join("\n");
      else                      f[key] = initial[key] || "";
    });
    return f;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const payload = {};
      fields.forEach(({ key, type, isArray, isLineArray }) => {
        if (type === "checkbox")  payload[key] = form[key];
        else if (isArray)         payload[key] = form[key].split(",").map((s) => s.trim()).filter(Boolean);
        else if (isLineArray)     payload[key] = form[key].split("\n").map((s) => s.trim()).filter(Boolean);
        else                      payload[key] = form[key];
      });
      await onSave(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="glass rounded-xl p-4 sm:p-5 space-y-3" style={{ border: "1px solid var(--border-hard)" }}>
      {fields.map(({ key, label, type, options }) => (
        <div key={key}>
          <label className="mono text-xs block mb-1" style={{ color: "var(--muted)" }}>{label}</label>

          {type === "textarea" ? (
            <textarea
              rows={3}
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg mono outline-none resize-none"
              style={sharedInputStyle}
            />
          ) : type === "select" ? (
            <select
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg mono outline-none"
              style={sharedInputStyle}
            >
              {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : type === "checkbox" ? (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                className="w-4 h-4 accent-[var(--accent)]"
              />
              <span className="mono text-xs" style={{ color: "var(--text)" }}>Yes</span>
            </label>
          ) : (
            <input
              type="text"
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg mono outline-none"
              style={sharedInputStyle}
            />
          )}
        </div>
      ))}

      {error && <p className="mono text-xs text-red-400">{error}</p>}

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSave}
          disabled={saving}
          className="mono text-xs px-4 py-2 rounded-lg transition"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="mono text-xs px-4 py-2 rounded-lg transition"
          style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminSection({ section, items, onRefresh }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  async function handleAdd(payload) {
    await ADD_APIS[section](payload);
    setAdding(false);
    onRefresh();
  }
  async function handleUpdate(id, payload) {
    await UPD_APIS[section](id, payload);
    setEditing(null);
    onRefresh();
  }
  async function handleToggle(id) {
    await TOG_APIS[section](id);
    onRefresh();
  }
  async function handleDelete(id) {
    setDeleting(id);
    try { await DEL_APIS[section](id); onRefresh(); }
    finally { setDeleting(null); }
  }

  function getLabel(item) {
    return item.title || item.name || item.role || "Item";
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {!adding && (
        <button
          onClick={() => setAdding(true)}
          className="mono text-xs px-4 py-2 rounded-lg transition flex items-center gap-2"
          style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
        >
          + Add {section.slice(0, -1)}
        </button>
      )}

      {adding && (
        <ItemForm section={section} onSave={handleAdd} onCancel={() => setAdding(false)} />
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="glass rounded-xl p-4 sm:p-5"
          style={{
            border: `1px solid ${item.visible ? "var(--border)" : "rgba(255,80,80,0.2)"}`,
            opacity: item.visible ? 1 : 0.6,
          }}
        >
          {editing === item.id ? (
            <ItemForm
              section={section}
              initial={item}
              onSave={(payload) => handleUpdate(item.id, payload)}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-sm truncate">{getLabel(item)}</span>
                  {item.featured && (
                    <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>featured</span>
                  )}
                  {item.category && (
                    <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--glow)", color: "var(--muted)", border: "1px solid var(--border)" }}>{item.category}</span>
                  )}
                  {item.level && (
                    <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--glow)", color: "var(--muted)", border: "1px solid var(--border)" }}>{item.level}</span>
                  )}
                  {item.type && (
                    <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--glow)", color: "var(--muted)", border: "1px solid var(--border)" }}>{item.type}</span>
                  )}
                  {!item.visible && (
                    <span className="mono text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,80,80,0.1)", color: "#f87171" }}>hidden</span>
                  )}
                </div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                  {item.description || item.details || (item.points ? item.points[0] : "")}
                </p>
                {item.tech && (
                  <p className="mono text-xs mt-1 truncate" style={{ color: "var(--accent)" }}>
                    {item.tech.join(", ")}
                  </p>
                )}
              </div>

              {/* Actions — full width row on mobile, column on sm+ */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap sm:flex-nowrap">
                <button
                  onClick={() => handleToggle(item.id)}
                  className="mono text-xs px-3 py-1.5 rounded-lg transition flex-1 sm:flex-none text-center"
                  style={{
                    background: item.visible ? "rgba(255,80,80,0.1)" : "rgba(80,200,80,0.1)",
                    color: item.visible ? "#f87171" : "#4ade80",
                    border: `1px solid ${item.visible ? "rgba(255,80,80,0.2)" : "rgba(80,200,80,0.2)"}`,
                  }}
                >
                  {item.visible ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => setEditing(item.id)}
                  className="mono text-xs px-3 py-1.5 rounded-lg transition flex-1 sm:flex-none text-center"
                  style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="mono text-xs px-3 py-1.5 rounded-lg transition flex-1 sm:flex-none text-center"
                  style={{ background: "rgba(255,80,80,0.08)", color: "#f87171", border: "1px solid rgba(255,80,80,0.15)" }}
                >
                  {deleting === item.id ? "..." : "Del"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {items.length === 0 && !adding && (
        <p className="mono text-xs" style={{ color: "var(--muted)" }}>
          No {section} yet. Add one above.
        </p>
      )}
    </div>
  );
}
