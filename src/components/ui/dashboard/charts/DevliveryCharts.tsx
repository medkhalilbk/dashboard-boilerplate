"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export function DeliveryChart() {
  // Données mises à jour pour le nombre de livraisons
  const deliveryData = [
    { month: "Janvier", livraisons: 186 },
    { month: "Février", livraisons: 305 },
    { month: "Mars", livraisons: 237 },
    { month: "Avril", livraisons: 73 },
    { month: "Mai", livraisons: 209 },
    { month: "Juin", livraisons: 214 },
    { month: "Juillet", livraisons: 180 },
    { month: "Août", livraisons: 220 },
    { month: "Septembre", livraisons: 250 },
    { month: "Octobre", livraisons: 190 },
    { month: "Novembre", livraisons: 230 },
    { month: "Décembre", livraisons: 210 },
  ]

  // Configuration du graphique avec couleurs mises à jour
  const deliveryChartConfig = {
    livraisons: {
      label: "Livraisons",
      color: "#A1D7B2", // Couleur personnalisée pour les livraisons
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nombre de livraisons</CardTitle>
        <CardDescription>Janvier - Décembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={deliveryChartConfig}>
          <BarChart
            accessibilityLayer
            data={deliveryData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="livraisons"
              fill="#A1D7B2" // Couleur personnalisée pour les barres
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendances en hausse de 5.2% ce mois-ci <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Affichage du nombre total de livraisons pour l&apos;année 2024
        </div>
      </CardFooter>
    </Card>
  )
}
