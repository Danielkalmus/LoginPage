import { User } from "./users";

const names: string[] = [
  "John",
  "Jane",
  "Alex",
  "Emily",
  "Chris",
  "Katie",
  "Michael",
  "Sarah",
  "David",
  "Laura",
  "Daniel",
];

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueNames(count: number): string[] {
  const nameSet: Set<string> = new Set();

  while (nameSet.size < count) {
    const firstName = names[getRandomInt(0, names.length - 1)];
    const lastName = names[getRandomInt(0, names.length - 1)];
    if (firstName !== lastName) {
      nameSet.add(`${firstName} ${lastName}`);
    }
  }

  return Array.from(nameSet);
}

export const GenerateRandomUsers = (count: number): User[] => {
  const users: User[] = [];
  const uniqueNames = generateUniqueNames(count);
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < count; i++) {
    const [firstName, lastName] = uniqueNames[i].split(" ");
    const randomYear = new Date(
      getRandomInt(currentYear - 50, currentYear - 18),
      getRandomInt(0, 11),
      getRandomInt(1, 28)
    )
      .toISOString()
      .split("T")[0];

    const user: User = {
      id: i + 1,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      password: Math.random().toString(36).substring(2, 8),
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: randomYear,
    };

    users.push(user);
  }

  return users;
};
