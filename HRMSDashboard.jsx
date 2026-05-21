import { useState } from "react";

const employees = [
  { id: 1, name: "Ahmed Al Mansoori", role: "Frontend Developer", dept: "Engineering", avatar: "AA", status: "present", leave: 12, used: 4 },
  { id: 2, name: "Priya Sharma", role: "HR Manager", dept: "Human Resources", avatar: "PS", status: "on-leave", leave: 15, used: 15 },
  { id: 3, name: "Mohammed Khalid", role: "Backend Engineer", dept: "Engineering", avatar: "MK", status: "present", leave: 12, used: 2 },
  { id: 4, name: "Sara Johnson", role: "Product Designer", dept: "Design", avatar: "SJ", status: "remote", leave: 12, used: 6 },
  { id: 5, name: "Ravi Nair", role: "DevOps Engineer", dept: "Engineering", avatar: "RN", status: "present", leave: 12, used: 1 },
  { id: 6, name: "Fatima Al Zaabi", role: "QA Engineer", dept: "Engineering", avatar: "FZ", status: "absent", leave: 12, used: 8 },
];

const leaveRequests = [
  { id: 1, name: "Sara Johnson", type: "Annual Leave", from: "2025-06-10", to: "2025-06-14", days: 5, status: "pending" },
  { id: 2, name: "Ravi Nair", type: "Sick Leave", from: "2025-05-22", to: "2025-05-23", days: 2, status: "approved" },
  { id: 3, name: "Mohammed Khalid", type: "Emergency Leave", from: "2025-05-28", to: "2025-05-29", days: 2, status: "pending" },
];

const statusColors = {
  present: { bg: "#e8f5e9", text: "#2e7d32", label: "Present" },
  "on-leave": { bg: "#fff3e0", text: "#e65100", label: "On Leave" },
  remote: { bg: "#e3f2fd", text: "#1565c0", label: "Remote" },
  absent: { bg: "#fce4ec", text: "#c62828", label: "Absent" },
};

const leaveStatusColors = {
  pending: { bg: "#fff8e1", text: "#f57f17", label: "Pending" },
  approved: { bg: "#e8f5e9", text: "#2e7d32", label: "Approved" },
  rejected: { bg: "#fce4ec", text: "#c62828", label: "Rejected" },
};

const deptColors = ["#6c63ff", "#00bcd4", "#ff7043", "#43a047", "#ab47bc", "#26a69a"];

const stats = [
  { label: "Total Employees", value: 6, icon: "👥", color: "#6c63ff" },
  { label: "Present Today", value: 3, icon: "✅", color: "#43a047" },
  { label: "On Leave", value: 1, icon: "🏖️", color: "#ff9800" },
  { label: "Pending Requests", value: 2, icon: "📋", color: "#e91e63" },
];

export default function HRMSDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [requests, setRequests] = useState(leaveRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  const departments = ["All", ...new Set(employees.map(e => e.dept))];
  const filtered = employees.filter(e =>
    (filterDept === "All" || e.dept === filterDept) &&
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLeaveAction = (id, action) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: action } : r)
    );
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f4f6fb", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1a1a2e" }}>HRMS Dashboard</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#888" }}>Human Resource Management System</p>
          </div>
          <div style={{ background: "#6c63ff", color: "#fff", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 600 }}>
            Jincy James · Senior Engineer
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["overview", "leave-requests", "attendance"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: activeTab === tab ? "#6c63ff" : "#fff",
                color: activeTab === tab ? "#fff" : "#555",
                boxShadow: activeTab === tab ? "0 2px 8px rgba(108,99,255,0.3)" : "0 1px 4px rgba(0,0,0,0.08)"
              }}
            >
              {tab === "overview" ? "👥 Employees" : tab === "leave-requests" ? "📋 Leave Requests" : "📅 Attendance"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 24 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <input
                placeholder="Search employee..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 13, outline: "none" }}
              />
              <select
                value={filterDept}
                onChange={e => setFilterDept(e.target.value)}
                style={{ padding: "9px 14px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 13, background: "#fff", cursor: "pointer" }}
              >
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {filtered.map((emp, i) => {
                const sc = statusColors[emp.status];
                const leavePercent = Math.round((emp.used / emp.leave) * 100);
                return (
                  <div key={emp.id} style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", background: deptColors[i % deptColors.length],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0
                    }}>{emp.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{emp.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: sc.bg, color: sc.text }}>{sc.label}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{emp.role} · {emp.dept}</div>
                      <div style={{ marginTop: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa", marginBottom: 4 }}>
                          <span>Leave used</span>
                          <span>{emp.used}/{emp.leave} days ({leavePercent}%)</span>
                        </div>
                        <div style={{ background: "#f0f0f0", borderRadius: 4, height: 5 }}>
                          <div style={{ width: `${leavePercent}%`, background: leavePercent > 80 ? "#e53935" : "#6c63ff", borderRadius: 4, height: 5 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Leave Requests Tab */}
        {activeTab === "leave-requests" && (
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 24 }}>
            <h3 style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>Pending & Recent Requests</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {requests.map(r => {
                const lc = leaveStatusColors[r.status];
                return (
                  <div key={r.id} style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{r.type} · {r.from} → {r.to} · <b>{r.days} days</b></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: lc.bg, color: lc.text }}>{lc.label}</span>
                      {r.status === "pending" && (
                        <>
                          <button onClick={() => handleLeaveAction(r.id, "approved")}
                            style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#e8f5e9", color: "#2e7d32", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                            Approve
                          </button>
                          <button onClick={() => handleLeaveAction(r.id, "rejected")}
                            style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#fce4ec", color: "#c62828", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 24 }}>
            <h3 style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>Today's Attendance — May 2025</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8f8ff" }}>
                    {["Employee", "Department", "Check In", "Check Out", "Hours", "Status"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#555", borderBottom: "1px solid #f0f0f0" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => {
                    const sc = statusColors[emp.status];
                    const checkIn = emp.status === "absent" || emp.status === "on-leave" ? "—" : "09:0" + i;
                    const checkOut = emp.status === "absent" || emp.status === "on-leave" ? "—" : "18:0" + i;
                    const hours = emp.status === "absent" || emp.status === "on-leave" ? "0h" : `${8 + i % 2}h`;
                    return (
                      <tr key={emp.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                        <td style={{ padding: "12px 14px", fontWeight: 500, color: "#1a1a2e" }}>{emp.name}</td>
                        <td style={{ padding: "12px 14px", color: "#888" }}>{emp.dept}</td>
                        <td style={{ padding: "12px 14px", color: "#555" }}>{checkIn}</td>
                        <td style={{ padding: "12px 14px", color: "#555" }}>{checkOut}</td>
                        <td style={{ padding: "12px 14px", fontWeight: 600, color: "#6c63ff" }}>{hours}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: sc.bg, color: sc.text }}>{sc.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#bbb" }}>
          HRMS v1.0 · Built with React.js + Node.js + PostgreSQL · github.com/jincy-james
        </div>
      </div>
    </div>
  );
}
