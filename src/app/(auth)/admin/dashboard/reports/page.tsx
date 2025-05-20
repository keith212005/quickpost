'use client';
import React from 'react';

const AdminDashboardReports = () => {
  const postReports = [
    {
      id: 'post1',
      title: 'Spam link everywhere',
      reports: 3,
      reason: 'Spam',
      reportedOn: '2025-05-15',
    },
    {
      id: 'post2',
      title: 'Offensive content in body',
      reports: 2,
      reason: 'Abusive',
      reportedOn: '2025-05-14',
    },
  ];

  const userReports = [
    {
      id: 'user1',
      name: 'TrollMaster99',
      reports: 5,
      status: 'Under Review',
      lastReport: '2025-05-15',
    },
    {
      id: 'user2',
      name: 'Spammer123',
      reports: 8,
      status: 'Suspended',
      lastReport: '2025-05-14',
    },
  ];

  return (
    <div className='space-y-8 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Reports</h1>
        <button className='rounded bg-black px-4 py-2 text-white'>
          Export CSV
        </button>
      </div>

      <section>
        <h2 className='mb-2 text-xl font-semibold'>Post Reports</h2>
        <table className='w-full table-auto border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Title</th>
              <th className='border px-4 py-2'>Report Count</th>
              <th className='border px-4 py-2'>Reason</th>
              <th className='border px-4 py-2'>Reported On</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postReports.map((report) => (
              <tr key={report.id}>
                <td className='border px-4 py-2'>{report.title}</td>
                <td className='border px-4 py-2'>{report.reports}</td>
                <td className='border px-4 py-2'>{report.reason}</td>
                <td className='border px-4 py-2'>{report.reportedOn}</td>
                <td className='border px-4 py-2'>
                  <button className='text-blue-600 hover:underline'>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className='mb-2 text-xl font-semibold'>User Reports</h2>
        <table className='w-full table-auto border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Username</th>
              <th className='border px-4 py-2'>Report Count</th>
              <th className='border px-4 py-2'>Status</th>
              <th className='border px-4 py-2'>Last Report</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userReports.map((user) => (
              <tr key={user.id}>
                <td className='border px-4 py-2'>{user.name}</td>
                <td className='border px-4 py-2'>{user.reports}</td>
                <td className='border px-4 py-2'>{user.status}</td>
                <td className='border px-4 py-2'>{user.lastReport}</td>
                <td className='border px-4 py-2'>
                  <button className='text-blue-600 hover:underline'>
                    Moderate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboardReports;
