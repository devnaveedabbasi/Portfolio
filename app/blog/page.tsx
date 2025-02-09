import BlogCard from '@/component/blogCard'
import HeaderText from '@/component/headerText'
import { blogData } from '@/constant/data'
import React from 'react'


export default function Page() {
   
  return (
    <>
    <div>
       <HeaderText backHead='Posts' frontHeadSimple='My' frontHeadColor='Blog' />
    </div>

    <div className="flex justify-center items-center py-10  gap-6">
    {blogData.map((blog, index) => (
        <BlogCard
          key={index}
          img={blog.img}
          title={blog.title}
          dis={blog.dis}
        />
      ))}
    </div>
    </>


  )
}
