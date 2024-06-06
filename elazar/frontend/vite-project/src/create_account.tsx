// src/components/Login.js
import { useState } from 'react';

function Create_account(){
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Age, setAge] = useState('');
    const [Gender, setGender] = useState('');
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordDC, setPasswordDC] = useState('');



    const handleSubmit = () => {
        // Add authentication logic here
        console.log('FirstName:', FirstName);
        console.log('LastName:', LastName);
        console.log('Age:', Age);
        console.log('Gender:', Gender);
        console.log('Username:', UserName);
        console.log('Password:', Password);
        console.log('PasswordDC:', PasswordDC);
    };

    return (
        <div>
            <h2>Create account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="text"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        value={Gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                <div>
                    <label>User Name:</label>
                    <input
                        type="text"
                        value={UserName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password double check:</label>
                    <input
                        type="text"
                        value={PasswordDC}
                        onChange={(e) => setPasswordDC(e.target.value)}
                    />
                </div>
                <button type="submit">Create account</button>
            </form>
        </div>
    );
};

export default Create_account;


/*
create account
first and last name
age
gender
username
password
*/