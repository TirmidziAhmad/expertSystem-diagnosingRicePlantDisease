'use client';

import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { disease: 'Penyakit A', cases: 450, fill: '#BEAA71' },
  { disease: 'Penyakit B', cases: 280, fill: '#9B8B5E' },
  { disease: 'Penyakit C', cases: 170, fill: '#A0977C' }
]

export default function DiseaseChart() {
  const totalCases = chartData.reduce((acc, curr) => acc + curr.cases, 0); // Total kasus untuk menghitung persentase

  return (
    <Card className="w-full max-w-xl mx-auto bg-white shadow-sm shadow-olive mt-4">
      <CardHeader>
        <CardTitle>Distribusi Penyakit</CardTitle>
        <CardDescription>Sebaran kasus berdasarkan jenis penyakit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center">
          <ChartContainer className="w-full aspect-square max-w-[400px] mx-auto">
            <PieChart width={340} height={340}>
              <Pie
                data={chartData}
                dataKey="cases"
                nameKey="disease"
                cx="35%"
                cy="45%"
                outerRadius={120}
                label={({ percent }) =>
                  `${Math.round(percent * 100)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>

          <div className="flex flex-wrap justify-center gap-4">
            {chartData.map((item) => (
              <div
                key={item.disease}
                className="flex items-start space-x-2 text-sm"
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></span>
                <span className="font-medium">{item.disease}</span>
                <span>({Math.round((item.cases / totalCases) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
