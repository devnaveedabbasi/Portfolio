"use client";
import { Blogs } from "@/constant/data";
import { RootState } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import DefaultImage from '@/public/assets/img/defult.jpeg'

const BlogCard = ({ img, title, dis }: Blogs) => {
  const router = useRouter();

  const handleClick = () => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    router.push(`/blog/${slug}`);
  };

  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  return (
    <div
      onClick={handleClick}
      className="group relative w-[330px] max-w-sm cursor-pointer overflow-hidden rounded bg-[#252525] shadow-lg"
    >
      <div className="h-48 w-full overflow-hidden">
        <Image
          src={img || DefaultImage}
          alt={title}
          width={500}
          height={300}
          priority
          className="object-cover transition-all group-hover:relative group-hover:z-10 group-hover:scale-125"
        />
      </div>
      <div
        className="h-[4px] w-full"
        style={{ backgroundColor: selectedColor }}
      ></div>
      <div className="px-6 py-4">
        <h2
          className="mb-2 font-Open_Sans text-[20px] font-medium text-white transition-all group-hover:text-[selectedColor]"
          onClick={handleClick}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.color = selectedColor;
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          {title}
        </h2>
        <p className="text-sm text-white">{dis}</p>
      </div>
    </div>
  );
};

export default BlogCard;
