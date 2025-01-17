import React from 'react'

export type ChartConfig = Record<string, { label: string; color?: string }>

export function ChartContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`w-full h-full ${className}`} {...props}>{children}</div>
}

export function ChartTooltip({ content }: { content: React.ReactNode }) {
  return content
}

export function ChartTooltipContent({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="text-sm">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

