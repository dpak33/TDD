export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // hashed password
}

let users: User[] = [];

export const addUser = (user: User) => {
    users.push(user);
};

export const findUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.username === username);
};