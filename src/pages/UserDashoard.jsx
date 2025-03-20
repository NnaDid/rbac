import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const UserDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [user, setUser] = useState({
    username: "john_doe",
    role: "user",
    email: "john.doe@example.com",
    phone: "+1234567890",
    mfaEnabled: false,
  });

  const [logs, setLogs] = useState([
    { id: 1, type: "LOGIN_SUCCESS", timestamp: "2025-03-07 09:00 AM", ip: "192.168.1.20" },
    { id: 2, type: "FAILED_LOGIN_ATTEMPT", timestamp: "2025-03-07 09:15 AM", ip: "203.0.113.5" },
    { id: 3, type: "PASSWORD_CHANGE", timestamp: "2025-03-07 09:30 AM", ip: "192.168.1.20" },
  ]);

  const [profile, setProfile] = useState({
    email: user.email,
    phone: user.phone,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUser({ ...user, ...profile });
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    document.getElementById("passwordModal").classList.remove("show");
    document.body.classList.remove("modal-open");
    document.querySelector(".modal-backdrop")?.remove();
  };

  const toggleMFA = () => {
    setUser({ ...user, mfaEnabled: !user.mfaEnabled });
    alert(user.mfaEnabled ? "MFA Disabled" : "MFA Enabled");
    document.getElementById("mfaModal").classList.remove("show");
    document.body.classList.remove("modal-open");
    document.querySelector(".modal-backdrop")?.remove();
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar Navigation */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="text-center">Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className={`nav-link w-100 text-start ${activeTab === "profile" ? "fw-bold" : ""}`} onClick={() => setActiveTab("profile")}>
              Profile
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link w-100 text-start ${activeTab === "security" ? "fw-bold" : ""}`} onClick={() => setActiveTab("security")}>
              Security Settings
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link  w-100 text-start ${activeTab === "logs" ? "fw-bold" : ""}`} onClick={() => setActiveTab("logs")}>
              Login History
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link text-danger w-100 text-start" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container mt-4 w-75 mx-auto">
        <h2>Welcome, {user.username}</h2>

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="card shadow p-4 w-75 mx-auto">
            <h5 className="text-center">Profile Information</h5>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-success w-100">Update Profile</button>
            </form>
          </div>
        )}

        {/* Security Section */}
        {activeTab === "security" && (
          <div className="card shadow p-4">
            <h5 className="text-center">Security Settings</h5>
            <div className="text-center">
              <button className="btn btn-warning w-100 mb-2" data-bs-toggle="modal" data-bs-target="#passwordModal">
                Update Password
              </button>
              <button className={`btn ${user.mfaEnabled ? "btn-danger" : "btn-primary"} w-100`} data-bs-toggle="modal" data-bs-target="#mfaModal">
                {user.mfaEnabled ? "Disable MFA" : "Enable MFA"}
              </button>
            </div>
          </div>
        )}

        {/* Login History */}
        {activeTab === "logs" && (
          <div className="card shadow p-4">
            <h5 className="text-center">Login History & Account Activity</h5>
            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>
                  <th>Timestamp</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className={log.type === "FAILED_LOGIN_ATTEMPT" ? "table-warning" : ""}>
                    <td>{log.type}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Password Update Modal */}
      <div className="modal fade" id="passwordModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePasswordChange}>
                <input type="password" className="form-control mb-2" placeholder="Current Password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} />
                <input type="password" className="form-control mb-2" placeholder="New Password" required value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
                <input type="password" className="form-control mb-2" placeholder="Confirm Password" required value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} />
                <button type="submit" className="btn btn-success w-100">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
