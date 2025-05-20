'use client';
import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboardAnalytics = () => {
  const postEngagementData = [
    { name: 'Post 1', Likes: 50, Flags: 2 },
    { name: 'Post 2', Likes: 80, Flags: 1 },
    { name: 'Post 3', Likes: 40, Flags: 4 },
    { name: 'Post 4', Likes: 30, Flags: 0 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 30 },
    { month: 'Feb', users: 50 },
    { month: 'Mar', users: 45 },
    { month: 'Apr', users: 60 },
    { month: 'May', users: 80 },
  ];

  const engagementPieData = [
    { name: 'Likes', value: 120 },
    { name: 'Flags', value: 10 },
    { name: 'Comments', value: 50 },
  ];

  const pieColors = ['#3B82F6', '#EF4444', '#FBBF24'];

  return (
    <>
      <h1 className='mb-4 text-2xl font-bold'>Analytics</h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Post Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={250}>
              <BarChart data={postEngagementData}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='Likes' fill='#3B82F6' />
                <Bar dataKey='Flags' fill='#EF4444' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={250}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='users'
                  stroke='#22C55E'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={250}>
              <PieChart>
                <Pie
                  data={engagementPieData}
                  dataKey='value'
                  nameKey='name'
                  outerRadius={80}
                  label
                >
                  {engagementPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardAnalytics;
