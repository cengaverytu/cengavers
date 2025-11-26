import { http } from "../../../lib/http";
import { User } from "../types/user";

export async function getAllUsers(): Promise<User[]> {
    const res = await http.get<User[]>("/users");
    return res.data;
}

export async function getUserById(id: number): Promise<User> {
    const res = await http.get<User>(`/users/${id}`);
    return res.data;
}

export async function deleteUser(id: number): Promise<void> {
    await http.delete<void>(`/users/${id}`);
}

