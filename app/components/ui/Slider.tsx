"use client"

import Image from "next/image"
import { useState } from "react"

import { twMerge } from "tailwind-merge"
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai"

interface SliderProps {
  images: string[]
  title: string
  className?: string
  containerClassName?: string
}

export function Slider({ images, title, className = "", containerClassName = "" }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState("")

  const goToPreviousSlide = () => {
    if (!isMoving) {
      setIsMoving(true)
      setDirection("left")
      setTimeout(() => {
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
        setIsMoving(false)
      }, 300)
    }
  }

  const goToNextSlide = () => {
    if (!isMoving) {
      setIsMoving(true)
      setDirection("right")
      setTimeout(() => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
        setIsMoving(false)
      }, 300)
    }
  }

  return (
    <div className={twMerge(`relative w-full tablet:w-full laptop:w-fit ${containerClassName}`)}>
      <div
        className={twMerge(
          `relative tablet:aspect-video h-[500px] tablet:h-[175px] laptop:h-[200px] desktop:h-[250px] tablet:w-fit overflow-hidden ${className}`,
        )}>
        {images.map((image: string, index: number) => (
          <Image
            className={twMerge(`w-full tablet:aspect-video h-[500px] tablet:h-[175px] laptop:h-[200px] desktop:h-[250px] tablet:w-fit object-cover
             transition-all duration-300 ${currentIndex === index ? "" : "opacity-0 absolute"}
              ${isMoving ? `transform ${direction === "left" ? "-translate-x-full" : "translate-x-full"}` : ""}
              ${className}`)}
            key={index}
            width={888}
            height={500}
            src={image}
            alt={title}
          />
        ))}
      </div>
      <button
        className="absolute top-0 bottom-0 left-0 w-[40px] bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
        onClick={goToPreviousSlide}>
        <AiFillCaretLeft className="h-6 w-6 text-white" />
      </button>
      <button
        className="absolute top-0 bottom-0 right-0 w-[40px] bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
        onClick={goToNextSlide}>
        <AiFillCaretRight className="h-6 w-6 text-white" />
      </button>
    </div>
  )
}
