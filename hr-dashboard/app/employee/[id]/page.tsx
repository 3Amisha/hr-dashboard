'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p className="p-6">Loading user...</p>;

  const departments = ['HR', 'Tech', 'Sales', 'Marketing'];
  const dept = departments[user.id % departments.length];
  const rating = Math.floor(Math.random() * 5) + 1;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Profile</h1>

      <Image
        src="/image.png"
        alt="Employee related image"
        width={600}
        height={300}
        className="mb-4 rounded-lg"
      />

      <div className="bg-white border rounded-lg p-6 shadow-md max-w-xl">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Department:</strong> {dept}</p>
        <p><strong>Bio:</strong> Enthusiastic team member with great communication skills.</p>
        <p><strong>Performance:</strong> <span className="text-yellow-500">{'⭐'.repeat(rating)}</span></p>
      </div>
    </main>
  );
}
