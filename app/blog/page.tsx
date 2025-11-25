"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  images: string[];
  createdAt: any;
  author: string;
  category: string;
  slug: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export default function BlogPage() {
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  
  const blogsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogsData: Blog[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogsData.push({
          id: doc.id,
          ...data,
          tags: data.tags || [],
          seoTitle: data.seoTitle || data.title,
          seoDescription: data.seoDescription || data.description,
          seoKeywords: data.seoKeywords || data.category,
        } as Blog);
      });
      setBlogs(blogsData);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(blogsData.map((blog) => blog.category))
      );
      setCategories(uniqueCategories);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter and paginate blogs
  useEffect(() => {
    let filtered = blogs;
    
    if (selectedCategory !== "All") {
      filtered = blogs.filter((blog) => blog.category === selectedCategory);
    }
    
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when category changes
  }, [blogs, selectedCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const displayedBlogs = filteredBlogs.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111]">
        <div className="text-center">
          <Icon
            icon="eos-icons:loading"
            width={50}
            className="mx-auto text-white"
          />
          <p className="mt-4 text-gray-400">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MobileNavigation navHeadFirst="My" NavHeadSec="Blogs" />
      <div className="min-h-screen bg-[#111111]">
        <HeaderText
          backHead="Posts"
          frontHeadSimple="My"
          frontHeadColor="Blog"
        />

        <div className="mx-auto w-[90%] py-12">
          {/* Header Stats */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Latest Blog Posts
              </h2>
              <p className="mt-2 text-gray-400">
                {filteredBlogs.length}{" "}
                {filteredBlogs.length === 1 ? "article" : "articles"} published
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:trending-up" width={16} />
                <span>Trending Topics</span>
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition"
                style={{
                  backgroundColor: selectedCategory === "All" ? selectedColor : "#1f2937",
                  color: selectedCategory === "All" ? "white" : selectedColor,
                }}
              >
                All ({blogs.length})
              </button>
              {categories.map((category) => {
                const count = blogs.filter((blog) => blog.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition"
                    style={{
                      backgroundColor:
                        selectedCategory === category ? selectedColor : `${selectedColor}20`,
                      color: selectedColor,
                    }}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Blogs Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center text-center">
              <div>
                <Icon
                  icon="mdi:note-text-outline"
                  width={80}
                  className="mx-auto mb-4 text-gray-600"
                />
                <h3 className="mb-2 text-xl font-semibold text-gray-400">
                  {selectedCategory === "All"
                    ? "No blogs published yet"
                    : `No blogs in ${selectedCategory}`}
                </h3>
                <p className="text-gray-500">
                  {selectedCategory === "All"
                    ? "Check back later for new articles"
                    : "Try selecting a different category"}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {displayedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group block"
                >
                  <article className="group h-full overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-2xl">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          blog.images && blog.images.length > 0
                            ? blog.images[0]
                            : DefaultImage
                        }
                        alt={blog.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>

                      {/* Category Badge */}
                      <div className="absolute left-4 top-4">
                        <span
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: `${selectedColor}30`,
                            color: selectedColor,
                          }}
                        >
                          {blog.category}
                        </span>
                      </div>

                      {/* Read Time */}
                      <div className="absolute right-4 top-4 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                        {Math.ceil(blog.content.split(/\s+/).length / 200)} min
                        read
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white group-hover:text-gray-200">
                        {blog.title}
                      </h3>

                      <p className="mb-4 line-clamp-3 text-sm text-gray-400">
                        {blog.description}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-white">
                            {blog.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {blog.author}
                            </p>
                            <p className="text-xs text-gray-400">
                              {blog.createdAt
                                ?.toDate?.()
                                .toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400 transition group-hover:text-white">
                          <span className="text-sm">Read more</span>
                          <Icon icon="mdi:arrow-right" width={16} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 rounded-lg bg-gray-800 px-4 py-2 text-gray-300 transition disabled:opacity-50 hover:bg-gray-700"
                  >
                    <Icon icon="mdi:chevron-left" width={20} />
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className="h-10 w-10 rounded-lg transition"
                          style={{
                            backgroundColor:
                              currentPage === page
                                ? selectedColor
                                : "#1f2937",
                            color:
                              currentPage === page ? "white" : "#9ca3af",
                          }}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 rounded-lg bg-gray-800 px-4 py-2 text-gray-300 transition disabled:opacity-50 hover:bg-gray-700"
                  >
                    Next
                    <Icon icon="mdi:chevron-right" width={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
