import BlogCard from '@/component/blogCard'
import HeaderText from '@/component/headerText'
import MobileNavigation from '@/component/partials/navigation/mobileNavigation'
import { blogData } from '@/constant/data'
import React from 'react'


export default function Page() {
   
  return (
    <>
            <MobileNavigation navHeadFirst='My' NavHeadSec='Blogs' />

    <div>
       <HeaderText backHead='Posts' frontHeadSimple='My' frontHeadColor='Blog' />
    </div>

    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 p-10 gap-6">
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
