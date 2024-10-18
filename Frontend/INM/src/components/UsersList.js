import React from 'react';

const UsersList = ({ users, onGrantAdmin, onRevokeAdmin, onDeleteUser }) => {
  return (
    <div className="bg-light shadow-sm rounded p-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Admin Actions</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* Show grant/revoke buttons only if the user is not a Super Admin */}
                {user.role !== 'Super Admin' && (
                  <>
                    {user.role === 'Admin' ? (
                      <button
                        onClick={() => onRevokeAdmin(user._id)}
                        className="btn btn-danger me-2 w-100" // Add w-100 to make it full width
                      >
                        Revoke Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => onGrantAdmin(user._id)}
                        className="btn btn-primary me-2 w-100" // Add w-100 to make it full width
                      >
                        Grant Admin
                      </button>
                    )}
                  </>
                )}
              </td>
              <td>
                {/* Always show the delete user button */}
                {user.role !== 'Super Admin' && (
                  <button
                    onClick={() => onDeleteUser(user._id)}
                    className="btn btn-secondary w-100" // Add w-100 to make it full width
                  >
                    Delete User
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
