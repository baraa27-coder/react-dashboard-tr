import api from "../../../services/api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (newUser) => {
  const response = await api.post("/users", newUser);
  return response.data;
};

export const removeUser = async (id) => {
  await api.delete(`/users/${id}`);
  return id;
};

export const editUser = async (id, updatedData) => {
  const response = await api.put(`/users/${id}`, updatedData);
  return response.data;
};