import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
);

console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY, "api key ");

export interface GeneratedBlog {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  imageUrls: string[];
}

// Fetch images from Unsplash based on blog topic
async function fetchBlogImages(
  topic: string,
  count: number = 3,
): Promise<string[]> {
  try {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

    // If no API key, use placeholder images
    if (!accessKey) {
      return Array(count).fill(
        `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80`,
      );
    }

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: topic,
        per_page: count,
        order_by: "relevant",
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results.map(
        (photo: { urls: { regular?: string; small?: string } }) =>
          photo.urls.regular || photo.urls.small,
      );
    }

    // Fallback to default tech image
    return Array(count).fill(
      `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80`,
    );
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    // Return default tech images on error
    return Array(count).fill(
      `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80`,
    );
  }
}

export async function generateBlogWithAI(
  topic?: string,
): Promise<GeneratedBlog> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const topics = [
    "Latest trends in Web Development",
    "AI and Machine Learning in 2024",
    "Next.js Best Practices",
    "React Performance Optimization",
    "Full Stack Development Guide",
    "Cloud Computing Trends",
    "DevOps Essentials",
    "TypeScript Advanced Patterns",
    "API Design Best Practices",
    "Database Optimization Techniques",
  ];

  const selectedTopic =
    topic || topics[Math.floor(Math.random() * topics.length)];

  const prompt = `Generate a professional blog post about "${selectedTopic}" in JSON format. Return ONLY valid JSON (no markdown, no code blocks) with this structure:
{
  "title": "Blog post title (5-8 words)",
  "description": "Short preview text (30-50 words)",
  "content": "Full blog content in HTML format with proper tags, paragraphs, and formatting (500-800 words)",
  "category": "Technology|Design|Development|AI|DevOps|Cloud|Database|Performance|Security|Business",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "seoTitle": "SEO optimized title (50-60 chars)",
  "seoDescription": "SEO meta description (150-160 chars)",
  "seoKeywords": "keyword1, keyword2, keyword3, keyword4"
}

Make the content engaging, informative, and include practical examples. Use HTML tags for formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON response");
    }

    const blogData = JSON.parse(jsonMatch[0]) as Omit<
      GeneratedBlog,
      "imageUrls"
    >;

    // Fetch related images
    const imageUrls = await fetchBlogImages(selectedTopic, 3);

    return {
      title: blogData.title || "Untitled Blog",
      description: blogData.description || "Blog description",
      content: blogData.content || "<p>Blog content</p>",
      category: blogData.category || "Technology",
      tags: Array.isArray(blogData.tags) ? blogData.tags : [],
      seoTitle: blogData.seoTitle || blogData.title,
      seoDescription: blogData.seoDescription || blogData.description,
      seoKeywords: blogData.seoKeywords || "",
      imageUrls: imageUrls,
    };
  } catch (error) {
    console.error("Error generating blog with AI:", error);
    throw error;
  }
}
