'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type TopUser = { name: string; posts: number };

const TopUsersChart = () => {
  const [data, setData] = useState<TopUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/stats/top-users');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch top users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-card rounded-xl border p-6 shadow-sm'>
      <h2 className='mb-4 text-xl font-semibold'>Top 5 Active Users</h2>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='posts' fill='#10b981' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopUsersChart;
