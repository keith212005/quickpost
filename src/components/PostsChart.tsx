'use client';

import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type PostStats = { date: string; posts: number };

export default function PostsChart() {
  const [data, setData] = useState<PostStats[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/stats/posts-per-day'); // see below
      const json = await res.json();
      setData(json);
    };

    fetchStats();
  }, []);

  return (
    <div className='bg-card rounded-xl border p-6 shadow-sm'>
      <h2 className='mb-4 text-xl font-semibold'>Posts Per Day</h2>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='posts'
            stroke='#4f46e5'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
