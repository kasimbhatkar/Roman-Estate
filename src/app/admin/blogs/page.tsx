import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import AdminBlogsClient from './AdminBlogsClient';

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function AdminBlogs() {
  const blogs = await getBlogs();

  return <AdminBlogsClient initialBlogs={blogs} />;
}
