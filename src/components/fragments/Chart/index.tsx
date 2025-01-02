"use client"

import { BarChart, Bar, XAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { name: "Jan", desktop: 40, mobile: 24 },
  { name: "Feb", desktop: 30, mobile: 13 },
  { name: "Mar", desktop: 20, mobile: 98 },
  { name: "Apr", desktop: 27, mobile: 39 },
  { name: "May", desktop: 18, mobile: 48 },
]

export default function Chart() {
    if (typeof window === "undefined") {
        console.log("Running on the server");
      } else {
        console.log("Running on the client");
      }
      
  return (
    <div className="max-w-lg mx-auto border border-olive rounded-lg shadow-xl py-2 px-10 mt-3">
      <p className="text-lg font-semibold mb-4">Chart apa ini ...?</p>

      <div className="overflow-x-auto">
        <BarChart width={420} height={240} data={data}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="desktop" fill="#BEAA71" radius={2} />
          <Bar dataKey="mobile" fill="#9B8B5E" radius={2} />
        </BarChart>
      </div>
    </div>
  )
}
