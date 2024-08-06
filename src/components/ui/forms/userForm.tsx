import React, { useState } from 'react';

interface UserFormProps {
    onSubmit: (user: User) => void;
}

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    imgUrl: string;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        role: '',
        isEmailVerified: false,
        imgUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(user);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={user.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={user.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={user.password} onChange={handleChange} />
            </label>
            <br />
            <label>
                Role:
                <input type="text" name="role" value={user.role} onChange={handleChange} />
            </label>
            <br />
            <label>
                Is Email Verified:
                <input type="checkbox" name="isEmailVerified" checked={user.isEmailVerified} onChange={handleChange} />
            </label>
            <br />
            <label>
                Image URL:
                <input type="text" name="imgUrl" value={user.imgUrl} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;