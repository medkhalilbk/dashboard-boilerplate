"use client"
import { BarChart, TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, CartesianGrid, XAxis } from "recharts"

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



export function MonthsChart() {
    // Data from server should be like this

const chartData = [
    { mois: "Janvier", livreurs: 186, restaurants: 80 },
    { mois: "Février", livreurs: 305, restaurants: 200 },
    { mois: "Mars", livreurs: 237, restaurants: 120 },
    { mois: "Avril", livreurs: 73, restaurants: 190 },
    { mois: "Mai", livreurs: 209, restaurants: 130 },
    { mois: "Juin", livreurs: 214, restaurants: 140 },
    { mois: "Juillet", livreurs: 180, restaurants: 160 },
    { mois: "Août", livreurs: 220, restaurants: 180 },
    { mois: "Septembre", livreurs: 250, restaurants: 150 },
    { mois: "Octobre", livreurs: 190, restaurants: 170 },
    { mois: "Novembre", livreurs: 230, restaurants: 160 },
    { mois: "Décembre", livreurs: 210, restaurants: 180 },
  ]
  
  const chartConfig = {
    livreurs: {
      label: "Livreurs",
      color: "#079435",
    },
    restaurants: {
      label: "Restaurants",
      color: "#FF5B5B",
    },
  } satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nombre de restaurants et livereurs</CardTitle>
        <CardDescription>
          Affichage des données pour toute l'année
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mois"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="restaurants"
              type="natural"
              fill="var(--color-restaurants)"
              fillOpacity={0.4}
              stroke="var(--color-restaurants)"
              stackId="a"
            />
            <Area
              dataKey="livreurs"
              type="natural"
              fill="var(--color-livreurs)"
              fillOpacity={0.4}
              stroke="var(--color-livreurs)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendances en hausse de 5.2% cette année <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Janvier - Décembre 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}


 