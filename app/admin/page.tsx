"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";

// ─── Auth Gate ───────────────────────────────────────────────
function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) { setAuthed(false); return; }
    fetch("/api/admin-auth", { headers: { "x-admin-token": token } })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  const login = async (password: string): Promise<string | null> => {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token } = await res.json();
      sessionStorage.setItem("admin_token", token);
      setAuthed(true);
      return null;
    }
    const { error } = await res.json();
    return error ?? "Fehler bei der Anmeldung";
  };

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    setAuthed(false);
  };

  return { authed, login, logout };
}

function LoginScreen({ onLogin }: { onLogin: (pw: string) => Promise<string | null> }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const err = await onLogin(pw);
    if (err) { setError(err); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Admin-Bereich</h1>
        <p className="text-sm text-gray-500 mb-6">Bitte Passwort eingeben</p>
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">{error}</div>
        )}
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Passwort"
          autoFocus
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Prüfe…" : "Anmelden"}
        </button>
      </form>
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: "new", label: "Neu", color: "bg-blue-100 text-blue-800" },
  { value: "contacted", label: "Kontaktiert", color: "bg-yellow-100 text-yellow-800" },
  { value: "qualified", label: "Qualifiziert", color: "bg-green-100 text-green-800" },
  { value: "sent_to_partner", label: "An Partner", color: "bg-purple-100 text-purple-800" },
  { value: "closed", label: "Abgeschlossen", color: "bg-gray-100 text-gray-800" },
  { value: "rejected", label: "Abgelehnt", color: "bg-red-100 text-red-800" },
];

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const { authed, login, logout } = useAdminAuth();

  if (authed === null) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Lade…</div>;
  }
  if (!authed) {
    return <LoginScreen onLogin={login} />;
  }

  return <AdminDashboard onLogout={logout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const leads = useQuery(api.leads.listLeads);
  const updateStatus = useMutation(api.leads.updateLeadStatus);
  const deleteLead = useMutation(api.leads.deleteLead);
  const [deleting, setDeleting] = useState<string | null>(null);

  const stats = {
    total: leads?.length ?? 0,
    new: leads?.filter((l) => l.status === "new").length ?? 0,
    qualified: leads?.filter((l) => l.status === "qualified").length ?? 0,
    sent: leads?.filter((l) => l.status === "sent_to_partner").length ?? 0,
  };

  const handleDelete = async (id: string) => {
    if (confirm("Lead wirklich löschen? Das kann nicht rückgängig gemacht werden.")) {
      setDeleting(id);
      await deleteLead({ id: id as any });
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Immo-Leads Verwaltung</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Zur Webseite
            </a>
            <button
              onClick={onLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Gesamt", value: stats.total, color: "text-gray-900" },
            { label: "Neue Leads", value: stats.new, color: "text-blue-600" },
            { label: "Qualifiziert", value: stats.qualified, color: "text-green-600" },
            { label: "An Partner", value: stats.sent, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Loading */}
        {leads === undefined && (
          <div className="text-center py-12 text-gray-500">Lade Leads…</div>
        )}

        {/* Empty */}
        {leads && leads.length === 0 && (
          <div className="text-center py-12 text-gray-500">Noch keine Leads vorhanden.</div>
        )}

        {/* Desktop Table */}
        {leads && leads.length > 0 && (
          <>
            <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Kontakt</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Einkommen</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Eigenkapital</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Beschäftigung</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Budget</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Quelle</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Datum</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => {
                    const st = getStatusStyle(lead.status);
                    return (
                      <tr key={lead._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {lead.email && <div>{lead.email}</div>}
                          {lead.phone && <div>{lead.phone}</div>}
                        </td>
                        <td className="px-4 py-3">{lead.grossIncome}</td>
                        <td className="px-4 py-3">{lead.equity}</td>
                        <td className="px-4 py-3">{lead.employmentType}</td>
                        <td className="px-4 py-3">{lead.investmentBudget ?? "–"}</td>
                        <td className="px-4 py-3 text-gray-500">{lead.source ?? "–"}</td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateStatus({ id: lead._id, status: e.target.value })
                            }
                            className={`text-xs font-medium rounded-full px-3 py-1 border-0 cursor-pointer ${st.color}`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDelete(lead._id)}
                            disabled={deleting === lead._id}
                            className="text-red-400 hover:text-red-600 text-xs disabled:opacity-50"
                          >
                            Löschen
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {leads.map((lead) => {
                const st = getStatusStyle(lead.status);
                return (
                  <div key={lead._id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{lead.name}</h3>
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus({ id: lead._id, status: e.target.value })
                        }
                        className={`text-xs font-medium rounded-full px-3 py-1 border-0 ${st.color}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {lead.email && <div>📧 {lead.email}</div>}
                      {lead.phone && <div>📞 {lead.phone}</div>}
                      <div className="grid grid-cols-2 gap-1 mt-2 text-xs text-gray-500">
                        <div>Einkommen: {lead.grossIncome}</div>
                        <div>EK: {lead.equity}</div>
                        <div>Beschäftigung: {lead.employmentType}</div>
                        <div>Budget: {lead.investmentBudget ?? "–"}</div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
                        <span>{formatDate(lead.createdAt)}</span>
                        <button
                          onClick={() => handleDelete(lead._id)}
                          disabled={deleting === lead._id}
                          className="text-red-400 hover:text-red-600 disabled:opacity-50"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
