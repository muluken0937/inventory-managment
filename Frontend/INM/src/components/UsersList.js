import React from 'react';

const UsersList = ({ users, onGrantAdmin, onRevokeAdmin, onDeleteUser }) => {
  return (
    <div className="bg-light shadow-sm rounded p-4">
      <ul className="list-unstyled">
        {users.map((user) => (
          <li key={user._id} className="p-3 border-bottom">
            <strong className="h5">Username:</strong> <span className="text-dark">{user.username}</span> <br />
            <strong className="h5">Email:</strong> <span className="text-dark">{user.email}</span> <br />
            <strong className="h5">Role:</strong> <span className="text-dark">{user.role}</span> <br />
            {user.role !== 'Super Admin' && (
              <div className="mt-3">
                {user.role === 'Admin' ? (
                  <button
                    onClick={() => onRevokeAdmin(user._id)}
                    className="btn btn-danger me-2"
                  >
                    Revoke Admin Privileges
                  </button>
                ) : (
                  <button
                    onClick={() => onGrantAdmin(user._id)}
                    className="btn btn-primary me-2"
                  >
                    Grant Admin Privileges
                  </button>
                )}
                <button
                  onClick={() => onDeleteUser(user._id)}
                  className="btn btn-secondary"
                >
                  Delete User
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
