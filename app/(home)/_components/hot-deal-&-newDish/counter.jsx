"use client";
import HomeCounterLoader from "@/components/loader/home-counter-loader";
import { useEffect, useState } from "react";

const Counter = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // set target date from local storage
  useEffect(() => {
    const savedTargetDate = localStorage.getItem("targetDate");
    if (savedTargetDate) {
      setTargetDate(new Date(savedTargetDate));
    } else {
      const newTargetDate = new Date();
      newTargetDate.setDate(newTargetDate.getDate() + 365);
      localStorage.setItem("targetDate", newTargetDate.toISOString());
      setTargetDate(newTargetDate);
    }
  }, []);

  useEffect(() => {
    if (targetDate) {
      const calculateTimeRemaining = (targetDate) => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      };

      // Initial calculation
      setTimeRemaining(calculateTimeRemaining(targetDate));

      // Update the timer every second
      const intervalId = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(targetDate));
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [targetDate]);

  // Render nothing or a loader until targetDate is set
  if (!targetDate) {
    return <HomeCounterLoader />;
  }

  return (
    <div className='w-full h-full flex justify-center items-center gap-x-3 md:gap-x-10  3xl:gap-x-20'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-white rounded-full  flex justify-center items-center'>
          <p className='text-deepInitial font-robotoSlab text-base md:text-3xl'>
            {timeRemaining.days}
          </p>
        </div>
        <div className='text-white font-medium font-robotoSlab text-sm md:text-lg'>
          Days
        </div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-white rounded-full  flex justify-center items-center'>
          <p className='text-deepInitial font-robotoSlab text-base md:text-3xl'>
            {timeRemaining.hours}
          </p>
        </div>
        <div className='text-white font-medium font-robotoSlab  text-sm md:text-lg'>
          Hours
        </div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-white rounded-full  flex justify-center items-center'>
          <p className='text-deepInitial font-robotoSlab text-base md:text-3xl'>
            {timeRemaining.minutes}
          </p>
        </div>
        <div className='text-white font-medium font-robotoSlab  text-sm md:text-lg'>
          Minutes
        </div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-white rounded-full  flex justify-center items-center'>
          <p className='text-deepInitial font-robotoSlab text-base md:text-3xl'>
            {timeRemaining.seconds}
          </p>
        </div>
        <div className='text-white font-medium font-robotoSlab  text-sm md:text-lg'>
          Seconds
        </div>
      </div>
    </div>
  );
};

export default Counter;
