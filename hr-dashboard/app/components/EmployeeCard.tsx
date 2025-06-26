'use client';

import Link from 'next/link';

type Props = {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  isBookmarked: boolean;
  isPromoted: boolean;
  onBookmark: () => void;
  onPromote: () => void;
};

export default function EmployeeCard({
  id,
  name,
  email,
  age,
  department,
  rating,
  isBookmarked,
  isPromoted,
  onBookmark,
  onPromote,
}: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>
        Department: <strong>{department}</strong>
      </p>
      <p>
        Performance:{' '}
        <span className="text-yellow-500">
          {'⭐'.repeat(Math.min(isPromoted ? rating + 1 : rating, 5))}
        </span>
        {isPromoted && (
          <span className="ml-2 text-xs px-2 py-1 rounded bg-green-600 text-white">
            Promoted
          </span>
        )}
      </p>

      <div className="flex gap-2 mt-3">
        <Link href={`/employee/${id}`}>
          <button className="bg-blue-600 text-white px-3 py-1 rounded">View</button>
        </Link>

        <button
          onClick={onBookmark}
          className={`${
            isBookmarked ? 'bg-yellow-700' : 'bg-yellow-500'
          } text-white px-3 py-1 rounded`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>

        <button
          onClick={onPromote}
          className={`${
            isPromoted ? 'bg-green-700' : 'bg-green-600'
          } text-white px-3 py-1 rounded`}
        >
          {isPromoted ? 'Promoted' : 'Promote'}
        </button>
      </div>
    </div>
  );
}
