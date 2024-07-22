import { hebrewFirstNames, hebrewLastNames } from '../const';
import { findUserByEmail, findUserByID, findAllUsers ,createUser, deleteUserByEmail, updateUserInfo, User, formatDate } from '../repositories/userRepository';

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
}

const updateUserField = async (userId: number, field: string, newValue: any) => {
    await updateUserInfo(Number(userId), field, newValue);
    console.log(`User with ID ${userId} updated successfully`);
}


const getRandomLetter = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letters.charAt(Math.floor(Math.random() * letters.length));
};

const createRandomEmail = () => {
    let string = '';
    for (let index = 0; index < 6; index++) {
        string = string + getRandomLetter();
    }
    return string + '@gmail.com';
}

const createRandomPassword = (): string => {
    let string = '';
    const charachters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    for (let index = 0; index < 6; index++) {
        string = string + charachters.charAt(Math.floor(Math.random() * charachters.length))
    }
    return string;
}

const getRandomDate = (): string => {
    const start = new Date(1940, 0, 1).getTime();
    const end = new Date(2014, 0, 1).getTime();
    const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
    return formatDate(new Date(randomTimestamp));
}

const getRandomIndex = (arrayLength: number): number => {
    return Math.floor(Math.random() * arrayLength);
  };

const newUser = () => {
    for (let index = 0; index < 10; index++) {
        registerUser({email: createRandomEmail(), 
            password: createRandomPassword(), 
            firstName: hebrewFirstNames[getRandomIndex(hebrewFirstNames.length)], 
            lastName: hebrewLastNames[getRandomIndex(hebrewLastNames.length)], 
            birthday: getRandomDate()} as User);        
    }
}
export {
    registerUser,
    getUserByEmail,
    getUserByID,
    getAllUsers,
    authenticateUser,
    deleteUser,
    updateUserField,
    newUser
};