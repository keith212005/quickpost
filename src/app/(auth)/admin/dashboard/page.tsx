'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-6'>
      <h1 className='mb-6 text-3xl font-bold'>Dashboard</h1>

      <Tabs defaultValue='overview' className='mb-6'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>1,245</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>320</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts This Month</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>210</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>87</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
