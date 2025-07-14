import React, { useState } from 'react';
import { Table } from '@/components/ui';
import type { ChangeEvent } from 'react';
import { signInUserData } from '@/mock/data/authData';
import FileManager from './FileManager';
import ThemeBuilder from './ThemeBuilder';
import Billing from './Billing';
import VideoCallDemo from './VideoCallDemo';

const sections = [
  { key: 'users', label: 'Users' },
  { key: 'roles', label: 'Roles' },
  { key: 'logs', label: 'Logs' },
  { key: 'content', label: 'Content' },
  { key: 'files', label: 'File Manager' },
  { key: 'theme', label: 'Theme Builder' },
  { key: 'billing', label: 'Billing' },
  { key: 'video', label: 'Video Call' },
];

type UserType = typeof signInUserData[number];

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('users');
  const [users, setUsers] = useState<UserType[]>(signInUserData);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserType | null>(null);
  const [editForm, setEditForm] = useState({ userName: '', email: '', authority: '' });

  // Handle edit
  const handleEdit = (user: UserType) => {
    setEditUser(user);
    setEditForm({
      userName: user.userName,
      email: user.email,
      authority: user.authority?.join(', ') || '',
    });
  };
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    if (!editUser) return;
    setUsers(users.map(u => u.id === editUser.id ? { ...u, ...editForm, authority: editForm.authority.split(',').map(r => r.trim()) } : u));
    setEditUser(null);
  };

  // Handle delete
  const handleDelete = (user: UserType) => setDeleteUser(user);
  const confirmDelete = () => {
    if (!deleteUser) return;
    setUsers(users.filter(u => u.id !== deleteUser.id));
    setDeleteUser(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`text-left px-4 py-2 rounded font-medium transition-colors ${activeSection === section.key ? 'bg-primary text-white' : 'hover:bg-primary/10 dark:hover:bg-primary/20'}`}
              onClick={() => setActiveSection(section.key)}
              aria-current={activeSection === section.key ? 'page' : undefined}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeSection === 'users' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">User Management</h3>
            <div className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow">
              <Table>
                <Table.THead>
                  <Table.Tr>
                    <Table.Th>Avatar</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Roles</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.THead>
                <Table.TBody>
                  {users.map((user) => (
                    <Table.Tr key={user.id}>
                      <Table.Td>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.userName} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <span className="inline-block w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-200">
                            {user.userName?.[0]}
                          </span>
                        )}
                      </Table.Td>
                      <Table.Td>{user.userName}</Table.Td>
                      <Table.Td>{user.email}</Table.Td>
                      <Table.Td>
                        <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">
                          {user.authority?.join(', ')}
                        </span>
                      </Table.Td>
                      <Table.Td>
                        <button className="text-blue-600 hover:underline mr-2" aria-label={`Edit ${user.userName}`} onClick={() => handleEdit(user)}>Edit</button>
                        <button className="text-red-600 hover:underline" aria-label={`Delete ${user.userName}`} onClick={() => handleDelete(user)}>Delete</button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.TBody>
              </Table>
            </div>
            {/* Edit User Modal */}
            {editUser && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
                  <h4 className="text-lg font-bold mb-4">Edit User</h4>
                  <label className="block mb-2 font-medium">Name
                    <input name="userName" value={editForm.userName} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                  </label>
                  <label className="block mb-2 font-medium">Email
                    <input name="email" value={editForm.email} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                  </label>
                  <label className="block mb-4 font-medium">Roles (comma separated)
                    <input name="authority" value={editForm.authority} onChange={handleEditChange} className="w-full border rounded px-3 py-2 mt-1" />
                  </label>
                  <div className="flex gap-2 justify-end">
                    <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" onClick={() => setEditUser(null)}>Cancel</button>
                    <button className="px-4 py-2 rounded bg-primary text-white" onClick={handleEditSave}>Save</button>
                  </div>
                </div>
              </div>
            )}
            {/* Delete User Modal */}
            {deleteUser && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
                  <h4 className="text-lg font-bold mb-4">Delete User</h4>
                  <p>Are you sure you want to delete <span className="font-semibold">{deleteUser.userName}</span>?</p>
                  <div className="flex gap-2 justify-end mt-6">
                    <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700" onClick={() => setDeleteUser(null)}>Cancel</button>
                    <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={confirmDelete}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeSection === 'roles' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Role Management</h3>
            <div className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow">
              <Table>
                <Table.THead>
                  <Table.Tr>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Users</Table.Th>
                    <Table.Th>Permissions</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.THead>
                <Table.TBody>
                  <Table.Tr>
                    <Table.Td>admin</Table.Td>
                    <Table.Td>John Doe</Table.Td>
                    <Table.Td>All</Table.Td>
                    <Table.Td><button className="text-blue-600 hover:underline">Edit</button></Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>user</Table.Td>
                    <Table.Td>Jane Smith</Table.Td>
                    <Table.Td>View, Edit</Table.Td>
                    <Table.Td><button className="text-blue-600 hover:underline">Edit</button></Table.Td>
                  </Table.Tr>
                </Table.TBody>
              </Table>
            </div>
          </div>
        )}
        {activeSection === 'logs' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Audit Logs</h3>
            <div className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow">
              <Table>
                <Table.THead>
                  <Table.Tr>
                    <Table.Th>Timestamp</Table.Th>
                    <Table.Th>User</Table.Th>
                    <Table.Th>Action</Table.Th>
                    <Table.Th>Details</Table.Th>
                  </Table.Tr>
                </Table.THead>
                <Table.TBody>
                  <Table.Tr>
                    <Table.Td>2024-06-01 10:00</Table.Td>
                    <Table.Td>John Doe</Table.Td>
                    <Table.Td>Login</Table.Td>
                    <Table.Td>Successful login</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>2024-06-01 10:05</Table.Td>
                    <Table.Td>Jane Smith</Table.Td>
                    <Table.Td>Edit Profile</Table.Td>
                    <Table.Td>Changed email address</Table.Td>
                  </Table.Tr>
                </Table.TBody>
              </Table>
            </div>
          </div>
        )}
        {activeSection === 'content' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Content Management</h3>
            <div className="rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow">
              <Table>
                <Table.THead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Type</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.THead>
                <Table.TBody>
                  <Table.Tr>
                    <Table.Td>Welcome to Cura Aid</Table.Td>
                    <Table.Td>Announcement</Table.Td>
                    <Table.Td>Published</Table.Td>
                    <Table.Td><button className="text-blue-600 hover:underline">Edit</button></Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Privacy Policy</Table.Td>
                    <Table.Td>Page</Table.Td>
                    <Table.Td>Draft</Table.Td>
                    <Table.Td><button className="text-blue-600 hover:underline">Edit</button></Table.Td>
                  </Table.Tr>
                </Table.TBody>
              </Table>
            </div>
          </div>
        )}
        {activeSection === 'files' && (
          <FileManager />
        )}
        {activeSection === 'theme' && (
          <ThemeBuilder />
        )}
        {activeSection === 'billing' && (
          <Billing />
        )}
        {activeSection === 'video' && (
          <VideoCallDemo />
        )}
      </main>
    </div>
  );
} 