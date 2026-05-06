'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCreateBlogMutation } from '@/lib/redux/slices/apiSlice';

export default function NewBlog() {
  const router = useRouter();
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Administrator',
    excerpt: '',
    image: '',
    tags: '',
    published: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      };

      await createBlog(dataToSubmit).unwrap();
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <Link href="/admin/blogs" className="text-gray-600 hover:text-gray-900 flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </Link>
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          {isLoading ? 'Posting...' : 'Publish Post'}
        </button>
      </div>

      <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Create New Blog Post</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleChange}
                placeholder="e.g. 5 Tips for First-Time Home Buyers in Mumbai"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
              <textarea 
                name="excerpt" value={formData.excerpt} onChange={handleChange}
                rows={2}
                placeholder="A brief overview to entice readers..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown or HTML supported)</label>
              <textarea 
                name="content" value={formData.content} onChange={handleChange}
                rows={10}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                <input 
                  type="text" name="author" value={formData.author} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" name="tags" value={formData.tags} onChange={handleChange}
                  placeholder="Real Estate, Mumbai, Investment"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" name="published" checked={formData.published} onChange={(e) => setFormData(prev => ({...prev, published: e.target.checked}))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">Published</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
