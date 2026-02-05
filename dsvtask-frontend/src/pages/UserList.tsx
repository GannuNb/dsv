import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../api/userApi";
import { userFormConfig } from "../config/userFormConfig";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const saveEdit = async (id: string) => {
    await updateUser(id, editData);
    setEditId(null);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">User Management</h4>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              {userFormConfig.map((f) => (
                <th key={f.name}>{f.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {userFormConfig.map((field) => (
                  <td key={field.name}>
                    {editId === user._id ? (
                      <input
                        className="form-control form-control-sm"
                        value={editData[field.name] || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            [field.name]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user[field.name]
                    )}
                  </td>
                ))}

                <td>
                  {editId === user._id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => saveEdit(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          setEditId(user._id);
                          setEditData(user);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          deleteUser(user._id).then(fetchUsers)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={userFormConfig.length + 1}
                  className="text-center"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
