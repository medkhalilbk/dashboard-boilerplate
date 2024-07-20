"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Données mises à jour pour les restaurants avec des nuances de vert et de rouge
const chartData = [
  { restaurant: "Tarkan", deliveries: 150, fill: "#FF5B5B" }, // Nuance de rouge
  { restaurant: "Tarcos", deliveries: 200, fill: "#FF8C8C" }, // Nuance de rouge plus claire
  { restaurant: "Baguette", deliveries: 100, fill: "#FF4C4C" }, // Nuance de rouge plus foncée
  { restaurant: "Plan B", deliveries: 250, fill: "#FF6B6B" }, // Nuance de rouge
  { restaurant: "Maracana", deliveries: 180, fill: "#4CAF50" }, // Nuance de vert
  { restaurant: "Bombaye", deliveries: 120, fill: "#66BB6A" }, // Nuance de vert plus claire
]

const chartConfig = {
  deliveries: {
    label: "Deliveries",
  },
  "Tarkan": {
    label: "Tarkan",
    color: "#FF5B5B", // Nuance de rouge
  },
  "Tarcos": {
    label: "Tarcos",
    color: "#FF8C8C", // Nuance de rouge plus claire
  },
  "Baguette": {
    label: "Baguette",
    color: "#FF4C4C", // Nuance de rouge plus foncée
  },
  "Plan B": {
    label: "Plan B",
    color: "#FF6B6B", // Nuance de rouge
  },
  "Maracana": {
    label: "Maracana",
    color: "#4CAF50", // Nuance de vert
  },
  "Bombaye": {
    label: "Bombaye",
    color: "#66BB6A", // Nuance de vert plus claire
  },
} satisfies ChartConfig

export function RestaurantDeliveryChart() {
  const totalDeliveries = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.deliveries, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Graphique Circulaire des Livraisons</CardTitle>
        <CardDescription>Nombre de restaurants par nombre de livraisons</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="deliveries"
              nameKey="restaurant"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDeliveries.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Livraisons
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendances en hausse de 5.2% ce mois-ci <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Affichage du nombre total de livraisons pour les restaurants
        </div>
      </CardFooter>
    </Card>
  )
}
