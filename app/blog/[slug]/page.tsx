"use client";

import HeaderText from "@/component/headerText";
import { blogData } from "@/constant/data";
import { Blogs } from "@/constant/data";
import { RootState } from "@/store";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const pathname = usePathname();
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  const slug = pathname?.split("/").pop();

  const slugString = typeof slug === "string" ? slug : "";

  const blog = blogData.find(
    (b: Blogs) => b.title.toLowerCase().replace(/\s+/g, "-") === slugString,
  );

  if (!blog) {
    return <div>Blog not found!</div>;
  }
 

  return (
    <>
      <HeaderText backHead="Posts" frontHeadSimple="My" frontHeadColor="Blog" />

      <div className="mx-auto max-w-2xl p-4">


        <div className="mb-5  flex items-center justify-start gap-6">
          <div className="flex items-center justify-center gap-2">
            <Icon
              icon="mdi:user-outline"
              style={{ color: selectedColor }}
              width={20}
              height={20}
            />{" "}
            <h6 className="text-[13px] font-Open_Sans text-white">{blog.author}</h6>
          </div>
        
          <div className="flex items-center justify-center gap-2">
            <Icon
              icon="solar:calendar-broken"
              style={{ color: selectedColor }}
              width={20}
              height={20}
            />{" "}
            <h6 className="text-[13px] font-Open_Sans text-white">{blog.date} </h6>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Icon
              icon="jam:tags"
              style={{ color: selectedColor }}
              width={20}
              height={20}
            />{" "}
            <h6 className="text-[13px] font-Open_Sans flex gap-2 text-white "> {blog.tags?.map((tag, index) => (
            <span
              key={index}
            >
              {tag}
            </span>
          ))}</h6>
          </div>
        </div>

        <h1 className="mb-4 font-Poppins text-[40px]  font-bold text-white">
          {blog.title}
        </h1>

        <Image
          src={blog.img}
          alt={blog.title}
          className="mb-4 h-80 w-full object-cover"
        />

    <p className="text-[15px] leading-[24px] font-medium font-Poppins mb-4 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <p className="text-[15px] leading-[24px] font-medium font-Poppins text-white">Loremectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labo ipsum dolor sit amet, consrum.</p>

      </div>
    </>
  );
};

export default BlogDetail;
