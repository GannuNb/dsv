const API_URL = process.env.REACT_APP_API_URL as string;

export const createUser = async (data: any) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const updateUser = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete failed");
};
