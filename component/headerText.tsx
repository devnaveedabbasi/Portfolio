'use client'
import { RootState } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';

interface Props{
    backHead:string,
    frontHeadSimple:String,
    frontHeadColor:String,
    height?:string
}
export default function HeaderText(props:Props) {
    const selectedColor = useSelector(
        (state: RootState) => state.color.selectedColor,
      );
  return (
    <div className="relative flex h-[150px] items-center justify-center px-4 pb-6 pt-6 mb-6 md:h-[160px] md:mb-10 md:pt-0 mt-20 md:mt-0">
        <div className="relative flex w-full justify-center">
          <h1 className="abt -z-10 select-none whitespace-nowrap text-center font-PoppinsHeading text-[clamp(42px,16vw,65px)] font-bold leading-none tracking-[clamp(2px,2vw,10px)] md:text-[90px]">
            {props.backHead}
          </h1>
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
          <h1 className="whitespace-nowrap text-center font-Open_Sans text-[clamp(28px,9vw,40px)] !font-extrabold text-white md:text-[56px]">
           {props.frontHeadSimple}{" "}
            <span
              className="font-Open_Sans"
              style={{ color: selectedColor }}
            >
          {props.frontHeadColor}
            </span>
          </h1>
        </div>
      </div>
  )
}
