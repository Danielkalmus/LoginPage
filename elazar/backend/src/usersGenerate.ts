import { firstNames, lastNames } from "./NamesList";
import { User } from "./Reposytories/Repo";
import { createNewAccount } from "./Services/service"

const generateRandomEmailOrPassword = ():string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    return password;
}

const generateRandomDate = (startYear: number, endYear: number): string => {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const year = randomDate.getFullYear();
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
    const day = randomDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

export const generateUser = async () => {
    const randUser: User = {
        firstName: firstNames[Math.floor(Math.random() * 100)],
        lastName: lastNames[Math.floor(Math.random() * 100)],
        email: generateRandomEmailOrPassword() + "@gmail.com",
        password: generateRandomEmailOrPassword(),
        age: generateRandomDate(1948, 2024)
    };

    await createNewAccount(randUser)
}