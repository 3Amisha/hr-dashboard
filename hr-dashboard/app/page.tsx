'use client';

import { useEffect, useState } from 'react';
import EmployeeCard from './components/EmployeeCard';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [promotedIds, setPromotedIds] = useState<number[]>([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const togglePromote = (id: number) => {
    setPromotedIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const departments = ['HR', 'Tech', 'Sales', 'Marketing'];
  const getRandomDept = (id: number) => departments[id % departments.length];
  const getStars = (id: number) => (id % 5) + 1;

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const dept = getRandomDept(user.id).toLowerCase();
    const stars = getStars(user.id);

    return (
      (!showBookmarkedOnly || bookmarkedIds.includes(user.id)) &&
      (fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.includes(searchTerm.toLowerCase())) &&
      (departmentFilter === '' || dept === departmentFilter.toLowerCase()) &&
      (ratingFilter === null || stars === ratingFilter)
    );
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name, email, department"
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded"
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dep => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={ratingFilter ?? ''}
          onChange={e =>
            setRatingFilter(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showBookmarkedOnly}
            onChange={e => setShowBookmarkedOnly(e.target.checked)}
          />
          Show Bookmarked Only
        </label>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(user => (
          <EmployeeCard
            key={user.id}
            id={user.id}
            name={`${user.firstName} ${user.lastName}`}
            email={user.email}
            age={user.age}
            department={getRandomDept(user.id)}
            rating={getStars(user.id)}
            isBookmarked={bookmarkedIds.includes(user.id)}
            onBookmark={() => toggleBookmark(user.id)}
            isPromoted={promotedIds.includes(user.id)}
            onPromote={() => togglePromote(user.id)}
          />
        ))}
      </div>
    </main>
  );
}
