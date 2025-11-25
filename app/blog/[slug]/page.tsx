import { Metadata } from "next";
import React from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import Image from "next/image";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import Link from "next/link";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import ShareButtons from "@/component/ShareButtons";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  images: string[];
  author: string;
  category: string;
  slug: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: any;
}

// Fetch blog by slug with better error handling
async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log("Fetching blog with slug:", slug);

    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    console.log("Query snapshot size:", querySnapshot.size);

    if (querySnapshot.empty) {
      console.log("No blog found with slug:", slug);

      // Try to find any blog to debug
      const allBlogsQuery = query(collection(db, "blogs"), limit(5));
      const allBlogsSnapshot = await getDocs(allBlogsQuery);
      console.log(
        "Available blogs:",
        allBlogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          slug: doc.data().slug,
          title: doc.data().title,
        })),
      );

      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    const blogData = {
      id: doc.id,
      ...data,
      // Ensure all fields have proper values
      tags: data.tags || [],
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.description,
      seoKeywords: data.seoKeywords || data.category,
      images: data.images || [DefaultImage.src],
    } as BlogPost;

    console.log("Found blog:", blogData);
    return blogData;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Fetch all blog slugs for static generation
export async function generateStaticParams() {
  try {
    const q = query(collection(db, "blogs"));
    const querySnapshot = await getDocs(q);

    const slugs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        slug: data.slug || doc.id, // Fallback to document ID if no slug
      };
    });

    console.log("Generated static params:", slugs);
    return slugs;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found - Naveed Abbasi",
      description: "The blog post you're looking for doesn't exist",
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.description,
    keywords: blog.seoKeywords || blog.category,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.description,
      images:
        blog.images && blog.images.length > 0
          ? [blog.images[0]]
          : [DefaultImage.src],
      type: "article",
      publishedTime: blog.createdAt?.toDate?.().toISOString(),
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.description,
      images:
        blog.images && blog.images.length > 0
          ? [blog.images[0]]
          : [DefaultImage.src],
    },
  };
}

export default async function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#111111]">
        <MobileNavigation navHeadFirst="Blog" NavHeadSec="Post" />
        <HeaderText
          backHead="Posts"
          frontHeadSimple="Blog"
          frontHeadColor="Post"
        />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Icon
              icon="mdi:file-remove"
              width={80}
              className="mx-auto mb-4 text-gray-600"
            />
            <h2 className="mb-4 text-2xl font-bold text-white">
              Blog Not Found
            </h2>
            <p className="mb-6 text-gray-400">
              The blog post "{params.slug}" doesn't exist or may have been
              moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Icon icon="mdi:arrow-left" width={20} />
              Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format date safely
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date";
    try {
      return (
        timestamp.toDate?.().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) || "Invalid date"
      );
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate reading time
  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);

  return (
    <>
      <MobileNavigation navHeadFirst="Blog" NavHeadSec="Post" />
      <div className="min-h-screen bg-[#111111]">
        <HeaderText
          backHead="Posts"
          frontHeadSimple="My"
          frontHeadColor="Blog"
        />

        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <Icon icon="mdi:arrow-left" width={20} />
            Back to All Blogs
          </Link>

          {/* Featured Image */}
          {blog.images && blog.images.length > 0 && blog.images[0] && (
            <div className="mb-8 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={blog.images[0]}
                alt={blog.title}
                width={1200}
                height={600}
                className="h-64 w-full object-cover md:h-96"
                priority
              />
            </div>
          )}

          <article className="mb-16">
            {/* Article Header */}
            <header className="mb-8">
              {/* Category */}
              <div className="mb-4">
                <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 border-b border-gray-700 pb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-white">
                    {blog.author?.charAt(0) || "N"}
                  </div>
                  <span>{blog.author || "Unknown Author"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon icon="mdi:calendar" width={16} />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon icon="mdi:clock-outline" width={16} />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="blog-content text-lg leading-relaxed text-gray-300"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  lineHeight: "1.8",
                }}
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 border-t border-gray-700 pt-6">
                <h3 className="mb-4 text-sm font-semibold text-gray-400">
                  TAGS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300 transition hover:bg-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section - Now using the client component */}
            <div className="mt-8 border-t border-gray-700 pt-6">
              <ShareButtons title={blog.title} slug={blog.slug} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
