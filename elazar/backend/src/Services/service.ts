import { createAccount, deleteUser, getAllUsers, selectUserByEmail, updatePassword, User } from "../Reposytories/Repo"



const getUserByEmail = async (email: string) => {
    if (!email) {
        throw new Error("Email is required")
    }
    const user = await selectUserByEmail(email);
    if (user.length === 0)
        throw new Error("User not found.")
    return user;
}

export const createNewAccount = async (user: User) => {
    const userExist = await selectUserByEmail(user.email);
    if (userExist !== undefined) {
        throw new Error("User already exist.")
    }
    await createAccount(user);
}

export const loginUser = async (email: string, password: string) => {
    const user = await selectUserByEmail(email);
    if (user === undefined) {
        throw new Error("User not found.")
    }
    if (user.password !== password) {
        throw new Error("Invalid password.")
    }
    return user;
}

export const updateUser = async (email: string, newPassword: string) => {
    await updatePassword(email, newPassword);
}

export const deleteAccount = async (email: string) => {
    await deleteUser(email);
}

export const getAllTheUsers = async () => {
    const users = await getAllUsers();
    if (users.length === 0) {
        throw new Error("Internal Server Error");
    } else {
        return users;
    }
}
