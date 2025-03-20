import { useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "john_doe", role: "user", mfaEnabled: true },
    { id: 2, username: "jane_admin", role: "admin", mfaEnabled: false },
    { id: 3, username: "mark_security", role: "security", mfaEnabled: true }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", role: "", mfaEnabled: false });

  // Handle Role Change
  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };

  // Save Role Change
  const saveRoleChange = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
      setSelectedUser(null);
    }
  };

  // Toggle MFA
  const toggleMFA = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, mfaEnabled: !user.mfaEnabled } : user
      )
    );
  };

  // Handle New User Input
  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add New User
  const addUser = () => {
    if (newUser.username && newUser.role) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setShowAddUserModal(false);
      setNewUser({ username: "", role: "", mfaEnabled: false });
    }
  };

  // Get Role Badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <span className="badge bg-danger rounded-pill px-3">Admin</span>;
      case "security":
        return <span className="badge bg-warning text-dark rounded-pill px-3">Security</span>;
      default:
        return <span className="badge bg-info text-white rounded-pill px-3">User</span>;
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Sidebar and Main Content Layout */}
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-auto d-none d-lg-block bg-dark text-white" style={{ width: "250px", minHeight: "100vh" }}>
          <div className="d-flex flex-column p-3">
            <h3 className="fs-4 mb-4 text-center py-3 border-bottom border-secondary">
              <i className="bi bi-shield-lock me-2"></i>
              Admin Portal
            </h3>
            
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link active text-white">
                  <i className="bi bi-people me-2"></i>
                  User Management
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link text-white-50">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link text-white-50">
                  <i className="bi bi-shield me-2"></i>
                  Security
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link text-white-50">
                  <i className="bi bi-journal-text me-2"></i>
                  Audit Logs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col">
          {/* Top Navigation */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
            <div className="container-fluid">
              <button className="navbar-toggler d-lg-none" type="button">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="d-flex align-items-center">
                <span className="fs-5 d-lg-none">Admin Portal</span>
              </div>
              
              <div className="ms-auto">
                <div className="dropdown">
                  <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: "32px", height: "32px" }}>A</div>
                    <span>Admin</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Dashboard Content */}
          <div className="p-4 bg-light" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div className="row mb-4">
              <div className="col">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4 className="mb-1">User Management</h4>
                    <p className="text-muted mb-0">Manage user roles and security settings</p>
                  </div>
                  <button 
                    className="btn btn-primary d-flex align-items-center" 
                    onClick={() => setShowAddUserModal(true)}
                  >
                    <i className="bi bi-plus-circle me-2"></i>Add User
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">Total Users</h6>
                        <h3 className="mb-0">{users.length}</h3>
                      </div>
                      <div className="bg-light rounded-circle p-3">
                        <i className="bi bi-people fs-4 text-primary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">Admin Users</h6>
                        <h3 className="mb-0">
                          {users.filter(user => user.role === "admin").length}
                        </h3>
                      </div>
                      <div className="bg-light rounded-circle p-3">
                        <i className="bi bi-person-fill-gear fs-4 text-danger"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted mb-1">MFA Enabled</h6>
                        <h3 className="mb-0">
                          {users.filter(user => user.mfaEnabled).length}
                        </h3>
                      </div>
                      <div className="bg-light rounded-circle p-3">
                        <i className="bi bi-shield-check fs-4 text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Table Card */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 ps-4 py-3">User</th>
                        <th className="border-0 py-3">Role</th>
                        <th className="border-0 py-3">MFA Status</th>
                        <th className="border-0 text-end pe-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-circle text-white bg-primary d-flex align-items-center justify-content-center flex-shrink-0 me-3" 
                                style={{width: "45px", height: "45px"}}
                              >
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="fw-bold mb-0">{user.username}</p>
                                <small className="text-muted">ID: {user.id}</small>
                              </div>
                            </div>
                          </td>
                          <td>{getRoleBadge(user.role)}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={user.mfaEnabled} 
                                onChange={() => toggleMFA(user.id)}
                                id={`mfa-switch-${user.id}`}
                              />
                              <label className="form-check-label small" htmlFor={`mfa-switch-${user.id}`}>
                                {user.mfaEnabled ? 
                                  <span className="text-success">Enabled</span> : 
                                  <span className="text-muted">Disabled</span>
                                }
                              </label>
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <button 
                              className="btn btn-sm btn-outline-primary" 
                              onClick={() => handleRoleChange(user)}
                            >
                              <i className="bi bi-pencil-square me-1"></i>
                              Change Role
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Change Modal */}
      {selectedUser && (
        <div className="modal fade show" style={{display: "block", backgroundColor: "rgba(0,0,0,0.5)"}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">Change Role for {selectedUser.username}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUser(null)}></button>
              </div>
              <div className="modal-body py-4">
                <select className="form-select" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">Normal User</option>
                  <option value="security">Security Team</option>
                </select>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-light" onClick={() => setSelectedUser(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary px-4" onClick={saveRoleChange}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal fade show" style={{display: "block", backgroundColor: "rgba(0,0,0,0.5)"}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title">Add New User</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddUserModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-person"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="username" 
                      value={newUser.username} 
                      onChange={handleNewUserChange} 
                      placeholder="Enter username"
                      required 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-shield"></i>
                    </span>
                    <select 
                      className="form-select" 
                      name="role" 
                      value={newUser.role} 
                      onChange={handleNewUserChange} 
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Normal User</option>
                      <option value="security">Security Team</option>
                    </select>
                  </div>
                </div>
                <div className="form-check form-switch mt-4">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="mfa" 
                    checked={newUser.mfaEnabled} 
                    onChange={() => setNewUser({ ...newUser, mfaEnabled: !newUser.mfaEnabled })} 
                  />
                  <label className="form-check-label" htmlFor="mfa">
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button 
                  className="btn btn-light" 
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary px-4" 
                  onClick={addUser}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;