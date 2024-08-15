"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

// Données mises à jour pour le nombre d'utilisateurs par mois
const chartData = [
  { month: "Janvier", users: 120 },
  { month: "Février", users: 180 },
  { month: "Mars", users: 150 },
  { month: "Avril", users: 200 },
  { month: "Mai", users: 170 },
  { month: "Juin", users: 210 },
]

const chartConfig = {
  users: {
    label: "Utilisateurs",
    color: "#FF5B5B", // Couleur rouge
  },
} satisfies ChartConfig

export function UserMonthlyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Utilisateurs</CardTitle>
        <CardDescription>
          Affichage du nombre total d&apos;utilisateurs pour les 6 derniers mois
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="users"
              type="natural"
              fill="#FF5B5B" // Couleur rouge
              fillOpacity={0.4}
              stroke="#FF5B5B" // Couleur rouge
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              En hausse de 5,2% ce mois-ci <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Janvier - Juin 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}