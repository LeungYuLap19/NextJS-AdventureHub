'use client';
import CountUp from 'react-countup'

export default function AnimatedCounter({ amount } : { amount : number }) {
  return (
    <div>
      <CountUp 
        end={amount}
        duration={2}
      />
    </div>
  )
}