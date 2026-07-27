import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api.js";

const TABS = ["Profile", "Certificates", "Projects"];

export default function AdminDashboard() {
  const [tab, setTab] = useState("Profile");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="text-sm px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400"
        >
          Log out
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                tab === t
                  ? "bg-brand-600 text-white"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Profile" && <ProfileEditor />}
        {tab === "Certificates" && <CertificateManager />}
        {tab === "Projects" && <ProjectManager />}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
    />
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
    />
  );
}

/* ---------------- Profile Editor ---------------- */
function ProfileEditor() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => {});
  }, []);

  if (!profile) return <p className="text-slate-500">Loading…</p>;

  const save = async () => {
    setStatus("Saving…");
    try {
      await api.updateProfile(profile);
      setStatus("Saved ✓");
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  const set = (key) => (e) => setProfile({ ...profile, [key]: e.target.value });
  const setSkills = (e) =>
    setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()) });

  return (
    <Card>
      <h2 className="font-bold text-slate-900 dark:text-white mb-4">Edit Profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Input value={profile.name || ""} onChange={set("name")} placeholder="Name" />
        <Input value={profile.tagline || ""} onChange={set("tagline")} placeholder="Tagline" />
        <Input value={profile.email || ""} onChange={set("email")} placeholder="Email" />
        <Input value={profile.github || ""} onChange={set("github")} placeholder="GitHub URL" />
        <Input value={profile.linkedin || ""} onChange={set("linkedin")} placeholder="LinkedIn URL" />
        <Input value={profile.whatsapp || ""} onChange={set("whatsapp")} placeholder="WhatsApp link" />
        <Input value={profile.photoUrl || ""} onChange={set("photoUrl")} placeholder="Photo URL" />
        <Input value={profile.resumeUrl || ""} onChange={set("resumeUrl")} placeholder="Resume PDF URL" />
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold text-slate-500">Bio</label>
        <TextArea rows={3} value={profile.bio || ""} onChange={set("bio")} />
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold text-slate-500">
          Skills (comma-separated)
        </label>
        <TextArea rows={2} value={(profile.skills || []).join(", ")} onChange={setSkills} />
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold text-slate-500">
          AI Training Notes — extra context fed to the AI assistant
        </label>
        <TextArea
          rows={3}
          value={profile.aiTrainingNotes || ""}
          onChange={set("aiTrainingNotes")}
        />
      </div>

      <button
        onClick={save}
        className="mt-5 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm"
      >
        Save Profile
      </button>
      {status && <p className="text-sm text-slate-500 mt-2">{status}</p>}
    </Card>
  );
}

/* ---------------- Certificate Manager ---------------- */
function CertificateManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyCert());

  function emptyCert() {
    return { title: "", issuer: "", imageUrl: "", dateIssued: "", description: "", skillsGained: "" };
  }

  const load = () => api.getCertificates().then(setItems).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = { ...form, skillsGained: form.skillsGained.split(",").map((s) => s.trim()).filter(Boolean) };
    await api.createCertificate(body);
    setForm(emptyCert());
    load();
  };

  const remove = async (id) => {
    await api.deleteCertificate(id);
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Add Certificate</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
          <Input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input required placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
          <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <Input placeholder="Date Issued" value={form.dateIssued} onChange={(e) => setForm({ ...form, dateIssued: e.target.value })} />
          <TextArea className="md:col-span-2" placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input className="md:col-span-2" placeholder="Skills gained (comma-separated)" value={form.skillsGained} onChange={(e) => setForm({ ...form, skillsGained: e.target.value })} />
          <button type="submit" className="md:col-span-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm">
            Add Certificate
          </button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((c) => (
          <Card key={c._id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{c.title}</h3>
                <p className="text-sm text-brand-600 dark:text-brand-400">{c.issuer}</p>
              </div>
              <button onClick={() => remove(c._id)} className="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Project Manager ---------------- */
function ProjectManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyProject());

  function emptyProject() {
    return { title: "", description: "", imageUrl: "", techStack: "", githubUrl: "", liveUrl: "" };
  }

  const load = () => api.getProjects().then(setItems).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = { ...form, techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean) };
    await api.createProject(body);
    setForm(emptyProject());
    load();
  };

  const remove = async (id) => {
    await api.deleteProject(id);
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Add Project</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
          <Input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <TextArea className="md:col-span-2" required placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Tech stack (comma-separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
          <Input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
          <Input placeholder="Live Demo URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
          <button type="submit" className="md:col-span-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm">
            Add Project
          </button>
        </form>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((p) => (
          <Card key={p._id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-sm text-slate-500">{(p.techStack || []).join(", ")}</p>
              </div>
              <button onClick={() => remove(p._id)} className="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
