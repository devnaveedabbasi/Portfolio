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
    <div className={`h-[160px] flex flex-col items-center justify-center p-8 mb-10 md:mt-0 mt-20`}>
        <div className="relative top-0">
          <h1 className="abt -z-10 select-none text-center font-PoppinsHeading md:text-[120px] text-[65px] font-bold leading-[0.4] tracking-[10px]">
            {props.backHead}
          </h1>
        </div>
        <div className="absolute md:top-11 top-[20%] flex">
          <h1 className="text-center font-Open_Sans md:text-[56px] text-[40px] !font-extrabold text-white">
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
