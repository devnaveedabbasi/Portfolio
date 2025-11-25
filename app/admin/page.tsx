"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { Icon } from "@iconify/react";
import HeaderText from "@/component/headerText";
import MobileNavigation from "@/component/partials/navigations/mobileNavigation";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import DefaultImage from "@/public/assets/img/defult.jpeg";
import { useAuthStore } from "@/lib/authStore";
import QuillEditor from "@/component/QuillEditor";
import { generateBlogWithAI } from "@/lib/geminiUtils";
import toast from "react-hot-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}

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
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin/login");
    }
  }, [isLoggedIn, router]);

  const [activeTab, setActiveTab] = useState<"contacts" | "blogs">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    content: "",
    author: "Naveed Abbasi",
    category: "Technology",
    tags: [] as string[],
    images: [] as File[],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contactsData: Contact[] = [];
      querySnapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() } as Contact);
      });
      setContacts(contactsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogsData: Blog[] = [];
      querySnapshot.forEach((doc) => {
        blogsData.push({ id: doc.id, ...doc.data() } as Blog);
      });
      setBlogs(blogsData);
    });
    return () => unsubscribe();
  }, []);
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Generate blog with AI using Gemini
  const generateBlogWithGemini = async () => {
    setGeneratingAI(true);
    try {
      const aiGeneratedBlog = await generateBlogWithAI();

      setBlogForm({
        title: aiGeneratedBlog.title,
        description: aiGeneratedBlog.description,
        content: aiGeneratedBlog.content,
        author: "Naveed Abbasi",
        category: aiGeneratedBlog.category,
        tags: aiGeneratedBlog.tags,
        images: [],
        seoTitle: aiGeneratedBlog.seoTitle,
        seoDescription: aiGeneratedBlog.seoDescription,
        seoKeywords: aiGeneratedBlog.seoKeywords,
      });

      // Set image previews from generated images
      setImagePreviews(aiGeneratedBlog.imageUrls || []);
      setEditingBlogId(null);

      toast.success(
        "Blog generated with AI including images! You can edit it before publishing.",
      );

      // Scroll to form
      document
        .getElementById("blog-form")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error generating blog:", error);
      toast.error(
        "Failed to generate blog with AI. Please check your Gemini API key.",
      );
    } finally {
      setGeneratingAI(false);
    }
  };

  // Load blog for editing
  const loadBlogForEditing = (blog: Blog) => {
    setBlogForm({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      tags: blog.tags || [],
      images: [],
      seoTitle: blog.seoTitle || "",
      seoDescription: blog.seoDescription || "",
      seoKeywords: blog.seoKeywords || "",
    });

    setImagePreviews(blog.images || []);
    setEditingBlogId(blog.id);

    // Scroll to form
    document
      .getElementById("blog-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Tag management functions
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !blogForm.tags.includes(tag)) {
      setBlogForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlogForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...blogForm.images, ...files];

    if (newFiles.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setBlogForm((prev) => ({ ...prev, images: newFiles }));

    // Create previews
    const newPreviews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setBlogForm((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(blogForm, "blog");
    if (!blogForm.title || !blogForm.description || !blogForm.content) {
      toast.error("Please fill title, description, and content");
      return;
    }

    setUploading(true);
    try {
      let imageUrls: string[] = [];

      // If editing and no new images, use existing previews
      if (editingBlogId && blogForm.images.length === 0) {
        imageUrls = imagePreviews;
      } else {
        // Handle AI-generated images (URLs from Unsplash)
        const aiImages = imagePreviews.filter(
          (preview) =>
            preview.startsWith("http://") || preview.startsWith("https://"),
        );
        imageUrls = [...aiImages];

        // Upload local file images
        const localImages = blogForm.images;
        if (localImages.length > 0) {
          for (const image of localImages) {
            const storageRef = ref(
              storage,
              `blogs/${Date.now()}-${Math.random()}-${image.name}`,
            );
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            imageUrls.push(url);
          }
        }

        // If no images at all, use default
        if (imageUrls.length === 0) {
          imageUrls.push("/assets/img/defult.jpeg");
        }
      }

      const slug = generateSlug(blogForm.title);

      if (editingBlogId) {
        // Update existing blog
        await updateDoc(doc(db, "blogs", editingBlogId), {
          title: blogForm.title,
          description: blogForm.description,
          content: blogForm.content,
          images: imageUrls,
          author: blogForm.author,
          category: blogForm.category,
          tags: blogForm.tags,
          slug: slug,
          seoTitle: blogForm.seoTitle || blogForm.title,
          seoDescription: blogForm.seoDescription || blogForm.description,
          seoKeywords: blogForm.seoKeywords || blogForm.tags.join(", "),
          updatedAt: serverTimestamp(),
        });
        toast.success("Blog updated successfully!");
      } else {
        // Create new blog
        await addDoc(collection(db, "blogs"), {
          title: blogForm.title,
          description: blogForm.description,
          content: blogForm.content,
          images: imageUrls,
          author: blogForm.author,
          category: blogForm.category,
          tags: blogForm.tags,
          slug: slug,
          seoTitle: blogForm.seoTitle || blogForm.title,
          seoDescription: blogForm.seoDescription || blogForm.description,
          seoKeywords: blogForm.seoKeywords || blogForm.tags.join(", "),
          createdAt: serverTimestamp(),
        });
        toast.success("Blog posted successfully!");
      }

      // Reset form
      setBlogForm({
        title: "",
        description: "",
        content: "",
        author: "Naveed Abbasi",
        category: "Technology",
        tags: [],
        images: [],
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
      });
      setImagePreviews([]);
      setTagInput("");
      setEditingBlogId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      toast.error("Failed to post blog");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        await deleteDoc(doc(db, "contacts", id));
        toast.success("Contact message deleted successfully!");
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact message");
      }
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog");
      }
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/admin/login");
    }
  };

  const resetForm = () => {
    setBlogForm({
      title: "",
      description: "",
      content: "",
      author: "Naveed Abbasi",
      category: "Technology",
      tags: [],
      images: [],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setImagePreviews([]);
    setTagInput("");
    setEditingBlogId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#111111]">
        <Icon icon="eos-icons:loading" width={50} className="text-white" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <MobileNavigation navHeadFirst="Admin" NavHeadSec="Panel" />
      <div className="min-h-screen bg-[#111111]">
        <HeaderText
          backHead="Dashboard"
          frontHeadSimple="Admin"
          frontHeadColor="Panel"
        />

        <div className="mx-auto w-[90%] py-12">
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              <Icon icon="mdi:logout" width={20} />
              Logout
            </button>
          </div>

          <div className="mb-8 flex gap-4 border-b border-gray-700">
            <button
              onClick={() => setActiveTab("contacts")}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition"
              style={{
                borderBottom:
                  activeTab === "contacts"
                    ? `3px solid ${selectedColor}`
                    : "none",
                color: activeTab === "contacts" ? selectedColor : "#999",
              }}
            >
              <Icon icon="mdi:email" width={20} />
              Messages ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition"
              style={{
                borderBottom:
                  activeTab === "blogs" ? `3px solid ${selectedColor}` : "none",
                color: activeTab === "blogs" ? selectedColor : "#999",
              }}
            >
              <Icon icon="mdi:blog" width={20} />
              Blogs ({blogs.length})
            </button>
          </div>

          {activeTab === "contacts" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Contact Messages ({contacts.length})
                </h2>
                {contacts.length > 0 && (
                  <p className="text-sm text-gray-400">
                    Click the delete icon to remove messages
                  </p>
                )}
              </div>

              {contacts.length === 0 ? (
                <div className="py-12 text-center">
                  <Icon
                    icon="mdi:inbox-outline"
                    width={64}
                    className="mx-auto mb-4 text-gray-600"
                  />
                  <p className="text-gray-400">No messages yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-white transition hover:border-gray-700"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold">
                                {contact.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {contact.email}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="ml-4 flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-2 text-red-400 transition hover:bg-red-500/30"
                            >
                              <Icon icon="mdi:delete" width={18} />
                              <span className="text-sm">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 rounded bg-gray-800 p-4">
                        <p className="mb-2 text-sm font-semibold text-gray-300">
                          Subject:
                        </p>
                        <p className="text-white">{contact.subject}</p>
                      </div>
                      <div className="mb-4 rounded bg-gray-800 p-4">
                        <p className="mb-2 text-sm font-semibold text-gray-300">
                          Message:
                        </p>
                        <p className="whitespace-pre-wrap text-gray-300">
                          {contact.message}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {contact.createdAt?.toDate?.().toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="space-y-8">
              <div
                id="blog-form"
                className="rounded-lg border border-gray-800 bg-gray-900 p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                    <Icon icon="mdi:plus-circle" />
                    {editingBlogId ? "Edit Blog" : "Create New Blog"}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={generateBlogWithGemini}
                      disabled={generatingAI || uploading}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
                      style={{ backgroundColor: selectedColor }}
                    >
                      {generatingAI ? (
                        <>
                          <Icon icon="eos-icons:loading" width={16} />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:sparkles" width={16} />
                          Generate with AI
                        </>
                      )}
                    </button>
                    {editingBlogId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105"
                      >
                        <Icon icon="mdi:close" width={16} />
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </div>
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-300">
                        Blog Title *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter blog title"
                        value={blogForm.title}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-300">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Technology, Design"
                        value={blogForm.category}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Short Description (for preview) *
                    </label>
                    <textarea
                      placeholder="Brief description for blog card"
                      value={blogForm.description}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="h-24 w-full rounded-lg bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Full Blog Content *
                    </label>
                    <div className="overflow-hidden rounded-lg">
                      <QuillEditor
                        value={blogForm.content}
                        onChange={(content) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            content: content,
                          }))
                        }
                        placeholder="Write your blog content here..."
                        className="min-h-64"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Tags
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter tags and press Enter or click Add"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagInputKeyDown}
                          className="flex-1 rounded-lg bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="rounded-lg px-4 py-2 text-white transition-all hover:scale-105"
                          style={{ backgroundColor: selectedColor }}
                        >
                          Add
                        </button>
                      </div>

                      {blogForm.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {blogForm.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                              style={{
                                backgroundColor: selectedColor + "20",
                                color: selectedColor,
                              }}
                            >
                              #{tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 rounded-full p-1 hover:bg-black/20"
                              >
                                <Icon icon="mdi:close" width={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                    <h3 className="mb-4 font-semibold text-gray-300">
                      SEO Optimization
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="SEO Title (optional)"
                        value={blogForm.seoTitle}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            seoTitle: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg bg-gray-800 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                      />
                      <textarea
                        placeholder="SEO Description for meta tags (optional)"
                        value={blogForm.seoDescription}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            seoDescription: e.target.value,
                          }))
                        }
                        className="h-16 w-full rounded-lg bg-gray-800 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                      />
                      <input
                        type="text"
                        placeholder="SEO Keywords (comma separated, optional)"
                        value={blogForm.seoKeywords}
                        onChange={(e) =>
                          setBlogForm((prev) => ({
                            ...prev,
                            seoKeywords: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg bg-gray-800 p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Blog Images (Max 5)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="w-full text-gray-400"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {blogForm.images.length}/5 images uploaded
                    </p>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-300">
                        Image Previews
                      </label>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="group relative h-32 overflow-hidden rounded-lg"
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 opacity-0 transition group-hover:opacity-100"
                            >
                              <Icon
                                icon="mdi:close"
                                width={16}
                                className="text-white"
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Author
                    </label>
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={blogForm.author}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg bg-gray-800 p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 rounded-lg py-3 font-semibold text-white transition-all hover:scale-105 disabled:opacity-50"
                      style={{
                        backgroundColor: selectedColor,
                      }}
                    >
                      {uploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Icon icon="eos-icons:loading" />
                          {editingBlogId ? "Updating..." : "Publishing..."}
                        </span>
                      ) : editingBlogId ? (
                        "Update Blog"
                      ) : (
                        "Publish Blog"
                      )}
                    </button>
                    {editingBlogId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    All Blogs ({blogs.length})
                  </h2>
                </div>
                {blogs.length === 0 ? (
                  <div className="py-12 text-center">
                    <Icon
                      icon="mdi:note-text-outline"
                      width={64}
                      className="mx-auto mb-4 text-gray-600"
                    />
                    <p className="text-gray-400">
                      No blogs yet. Generate one with AI or create manually!
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition hover:border-gray-700"
                      >
                        <div className="relative h-32 overflow-hidden">
                          <Image
                            src={
                              blog.images && blog.images.length > 0
                                ? blog.images[0]
                                : DefaultImage
                            }
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                          {blog.images && blog.images.length > 1 && (
                            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                              +{blog.images.length - 1}
                            </div>
                          )}
                        </div>
                        <div className="p-4 text-white">
                          <h3 className="mb-2 line-clamp-2 font-bold">
                            {blog.title}
                          </h3>
                          <p className="mb-2 line-clamp-2 text-xs text-gray-400">
                            {blog.description}
                          </p>

                          {blog.tags && blog.tags.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-1">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="rounded-full px-2 py-1 text-xs"
                                  style={{
                                    backgroundColor: selectedColor + "20",
                                    color: selectedColor,
                                  }}
                                >
                                  #{tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300">
                                  +{blog.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {blog.createdAt?.toDate?.().toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => loadBlogForEditing(blog)}
                                className="rounded-lg bg-blue-500/20 px-3 py-2 text-blue-400 transition hover:bg-blue-500/30"
                              >
                                <Icon icon="mdi:pencil" width={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(blog.id)}
                                className="rounded-lg bg-red-500/20 px-3 py-2 text-red-400 transition hover:bg-red-500/30"
                              >
                                <Icon icon="mdi:delete" width={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
