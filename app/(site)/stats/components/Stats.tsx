"use client"

import CountUp from "react-countup"

type StatsResponse = {
  stats:
    | {
        clicks: number
        created_at: string
        id: string
        utm_source: string
      }[]
    | null
}

export function Stats({ stats }: StatsResponse) {
  return (
    <ul>
      {stats?.map(stat => (
        <li className="flex flex-row justify-center items-center" key={stat.id}>
          <p>{stat.utm_source} -&nbsp;</p>
          <CountUp
            className="font-bold text-secondary-foreground"
            end={stat.clicks}
            duration={4}
            delay={0.5}
            separator=""
            key={stat.id}
          />
        </li>
      ))}
    </ul>
  )
}
