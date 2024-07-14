import supabaseAdmin from "@/libs/supabase/supabaseAdmin"
import CountUp from "react-countup"
import { Stats } from "./components/Stats"

export default async function StatsPage() {
  const { data: stats } = await supabaseAdmin.from("stats").select("*")

  return (
    <div
      className="w-full py-12 h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto
       text-2xl text-title flex flex-col gap-y-8 justify-between items-center mx-auto">
      <Stats stats={stats} />
    </div>
  )
}
