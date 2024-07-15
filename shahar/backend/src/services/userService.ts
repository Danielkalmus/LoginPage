import { findUserByEmail, findUserByID, findAllUsers ,createUser, deleteUserByEmail, updateUserInfo, User } from '../repositories/userRepository';

const registerUser = async (user: User): Promise<void> => {
    const existingUser = await findUserByEmail(user.email);
    if (existingUser.length > 0) {
        console.error('Authentication failed: An account already exists with this email address');
        throw new Error('An account already exists with this email address');
    }
    await createUser(user);
};

const getUserByEmail = async (email: string): Promise<User> => {
    if (!email) {
        console.error('bad request: Email is required');
        throw new Error('Email is required');
      }
    const users = await findUserByEmail(email);
    if (users.length === 0) {
        console.error('Authentication failed: No user found with this email');
        throw new Error('No user found with this email');
    }
    return users[0];
};

const getUserByID = async (id: number): Promise<User> => {
    const users = await findUserByID(id);
    if (users.length === 0) {
        console.error('Authentication failed: No user found');
        throw new Error('No user found');
    }
    return users[0];
};

const getAllUsers = async (): Promise<User[]> => {
    return await findAllUsers();
}

const authenticateUser = async (email: string, password: string): Promise<User> => {
    const user = await getUserByEmail(email);
    if (user.password !== password) {
        console.error('Authentication failed: Incorrect email or password');
        throw new Error('Incorrect email or password');
    }
    return user;
};

const deleteUser = async (email: string): Promise<void> => {
    const users = await findUserByEmail(email);
    if (users.length === 0) {
        console.error('process failed: User does not exist');
        throw new Error('User does not exist');
    }
    await deleteUserByEmail(email);
    console.log(`User with email ${email} deleted successfully`);
}

const updateUserField = async (userId: number, field: string, newValue: any) => {
    await updateUserInfo(Number(userId), field, newValue);
    console.log(`User with ID ${userId} updated successfully`);
}

export {
    registerUser,
    getUserByEmail,
    getUserByID,
    getAllUsers,
    authenticateUser,
    deleteUser,
    updateUserField
};