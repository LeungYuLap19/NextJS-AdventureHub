import React, { useEffect, useState } from 'react'
import Header from '../discover/Header'
import { getFullLocalWeather } from '@/lib/actions/weatherAPI';
import Image from 'next/image';
import SectionWithIcon from './SectionWithIcon';
import { get12HoursForecast, get7DaysForecast } from '@/lib/utils';

export default function PlannerWeather({ country }: { country: AutoCompleteResponse }) {
  const [fullWeather, setFullWeather] = useState<SevenDaysWeather | null>(null);
  const [formattedHours, setFormattedHours] = useState<Hour[] | null>(null);
  const [formattedDays, setFormattedDays] = useState<FormattedDaysForecast[] | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  const getFullWeather = async () => {
    const data = await getFullLocalWeather({ latitude: country.geo.center.latitude, longitude: country.geo.center.longitude });
    if (data) {
      setFullWeather(data);
      const formattedHourForecast = get12HoursForecast(data.forecast.forecastday);
      setFormattedHours(formattedHourForecast);
      const formattedDaysForecast = get7DaysForecast(data.forecast.forecastday, data.current.is_day);
      setFormattedDays(formattedDaysForecast);
      setRenderKey(renderKey + 1); // Force re-render
    }
  }
  
  useEffect(() => {
    getFullWeather();
  }, []);

  return (
    <div key={renderKey} className='flex flex-col md:p-7 md:pb-10'>
      <Header title={<>Local Weather</>} />
      {
        fullWeather &&
        <>
          <div className='flex gap-2 justify-between h-fit text-customBlack-300 mt-7'>
            <div className='flex flex-col gap-7'>
              <SectionWithIcon imgUrl='/root/marker.svg' text={fullWeather.location.name} />
              <p className='text-5xl'>{Math.floor(fullWeather.current.temp_c)}°</p>
            </div>

            <div className='flex flex-col justify-between items-end'>
              <Image 
                src={'https:' + fullWeather.current.condition.icon}
                alt='condition icon'
                height={30} width={30}
              />
              <p className='text-right'>{fullWeather.current.condition.text}</p>
              <p>{`H:${Math.floor(fullWeather.forecast.forecastday[0].day.maxtemp_c)}° L:${Math.floor(fullWeather.forecast.forecastday[0].day.mintemp_c)}°`}</p>
            </div>
          </div>

          <div className='flex flex-col gap-10 mt-12'>
            <SectionWithIcon imgUrl='/root/hour-forecast.svg' text='Hourly Forecast' />

            <div className='flex overflow-auto gap-10 max-md:gap-7'>
              {
                formattedHours &&
                formattedHours.map((hour: Hour) => (
                  <div key={hour.time} className='flex flex-col gap-2 items-center'>
                    <p className=''>{hour.time}</p>
                    <Image 
                      src={'https:' + hour.condition.icon}
                      alt={hour.condition.text}
                      height={30} width={30}
                    />
                    <p className='text-lg'>{Math.floor(hour.temp_c)}°</p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='flex flex-col gap-10 mt-12'>
            <SectionWithIcon imgUrl='/root/day-forecast.svg' text='7-Day Forecast' />

            <div className='flex flex-col gap-7 w-full 3xl:w-[90%]'>
              {
                formattedDays &&
                formattedDays.map((day) => (
                  <div key={day.weekday} className='flex justify-between'>
                    <div className='flex w-[30%] gap-4 items-center justify-between'>
                      <p className=''>{day.weekday}</p>
                      <Image 
                        src={'https:' + day.condition.icon}
                        alt={day.condition.text}
                        height={30} width={30}
                      />
                    </div>
                    
                    <div className='flex gap-4 w-[50%] max-lg:w-[60%] max-md:w-[50%] max-sm:w-[60%] items-center'>
                      <p className='text-customBlack-100'>{Math.floor(day.mintemp_c)}°</p>
                      <div className='relative h-[6px] flex-1 bg-customBlack-100 rounded-full'>
                      {day.hottestHours.map((hour, index) => (
                        <div
                          key={index}
                          className={`absolute h-[6px] bg-red-500
                          ${index === 0 && 'rounded-l-full'} 
                          ${index === day.hottestHours.length - 1 && 'rounded-r-full'}`}
                          style={{
                            left: `${(hour.hour / 24) * 100}%`,
                            width: '4.16%', // Assuming each hour block is 1/24th of the day
                          }}
                        ></div>
                      ))}
                      </div>
                      <p className=''>{Math.floor(day.maxtemp_c)}°</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </> 
      }
    </div>
  )
}
