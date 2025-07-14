import React, { useState } from 'react';

const initialUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe',
};

const Profile: React.FC = () => {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, name: form.name, email: form.email, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}` });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email });
    setEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mt-10">
      <div className="flex flex-col items-center gap-4">
        <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-primary" />
        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 px-4 py-2 border rounded w-full text-center"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 px-4 py-2 border rounded w-full text-center"
              placeholder="Email"
            />
            <div className="flex gap-4 mt-4">
              <button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save</button>
              <button onClick={handleCancel} className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <button onClick={() => setEditing(true)} className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile; 