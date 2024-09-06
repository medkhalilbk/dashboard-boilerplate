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
import React from "react"
import axios from "axios"
import { Spinner } from "../spinner"


export function TopsalesProduct() {
    const [chartData, setChartData] = React.useState([]);

 
      
      const chartConfig = {
        name: {
          label: "Ventes",
          color: "#84C79C",
        },
      } satisfies ChartConfig
    const date = new Date();

    // Subtract 30 days
    const pastDate = new Date(date);
    pastDate.setDate(date.getDate() - 30);
    
    // Format the resulting date
    const options = {
      weekday: 'long',
      year: 'numeric',
      name: 'long',
      day: 'numeric'
    } as Intl.DateTimeFormatOptions;
    
    const formattedDate = pastDate.toLocaleDateString('en-US', options);
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            let id = localStorage.getItem("id");
            axios.get(`/api/companies/${id}/charts`).then((res: any) => { 
                setChartData(res.data.data.topSaleChart);
            });
        }
    }, []);
      return (
        <Card>
          <CardHeader>
            <CardTitle>Meilleures ventes de produits</CardTitle>
            <CardDescription>{pastDate.toLocaleDateString("fr-FR", options) + " - " + date.toLocaleDateString("fr-FR", options)}</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <Spinner  />
            ) : (
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="quantity" fill="#019738" radius={8} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Statistiques des meillleurs produits vendues <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Les statistiques sont basées sur les ventes des produits de 30 derniers jours
            </div>
          </CardFooter>
        </Card>
      );
      
}
