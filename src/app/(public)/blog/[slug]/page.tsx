import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { Calendar, User, ArrowLeft, Tag, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) return { title: "Article Not Found" };

  return {
    title: `${blog.title} | Roman Estate Insights`,
    description: blog.excerpt,
  };
}

async function getBlog(slug: string) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    return null;
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <article className="bg-white min-h-screen pb-24">
      {/* Article Header/Hero */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={
            blog.image ||
            `https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600`
          }
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 font-bold text-white shadow-lg">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                    Written by
                  </p>
                  <p className="text-sm font-bold">{blog.author}</p>
                </div>
              </div>

              <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                <div>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
                    Published on
                  </p>
                  <p className="text-sm font-bold">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 mt-16 flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3">
          <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900">
            {blog.content.split("\n").map((para: string, i: number) =>
              para.trim() ? (
                <p key={i} className="mb-6">
                  {para}
                </p>
              ) : (
                <br key={i} />
              ),
            )}
          </div>

          {/* Social Share */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-2 text-gray-900 font-bold">
              <Share2 className="w-5 h-5 text-blue-600" />
              <span>Share this article</span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, color: "bg-blue-600" },
                { icon: Share2, color: "bg-gray-500" },
              ].map((social, i) => (
                <button
                  key={i}
                  className={`${social.color} text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-10">
          <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-blue-600" />
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Market Trends",
                "Investment",
                "Mumbai Guides",
                "Home Decor",
                "Legal Tips",
                "Finance",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-2xl font-bold mb-4 relative z-10">
              Need Expert Advice?
            </h4>
            <p className="text-gray-400 mb-8 relative z-10 font-medium">
              Our consultants are ready to help you navigate the Mumbai real
              estate market.
            </p>
            <Link
              href="/contact"
              className="block w-full text-center bg-blue-600 text-white font-extrabold py-4 rounded-2xl hover:bg-blue-700 transition-all relative z-10 shadow-xl shadow-blue-600/20 active:scale-95"
            >
              Contact Agent
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
