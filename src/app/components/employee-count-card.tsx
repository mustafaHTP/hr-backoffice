import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmployeeCountChart from "./employee-count-chart";
import { prisma } from "@/lib/prisma";

export default async function EmployeeCountCard() {
  const departments = await prisma.department.findMany({
    include: {
      employees: true,
    },
  });
  if (departments.length === 0) return null;

  // Available chart colors
  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  // Generate chart data from departments
  const chartData = departments.map((dept, index) => ({
    browser: dept.name,
    visitors: dept.employees.length,
    fill: chartColors[index % chartColors.length],
  }));

  // Generate chart config dynamically
  const chartConfig: ChartConfig = {
    visitors: {
      label: "Employees",
    },
  };

  departments.forEach((dept, index) => {
    chartConfig[dept.name.toLowerCase().replace(/\s+/g, "_")] = {
      label: dept.name,
      color: chartColors[index % chartColors.length],
    };
  });

  // Calculate total employees
  const totalEmployees = departments.reduce(
    (sum, dept) => sum + dept.employees.length,
    0,
  );

  const today = new Date();

  return (
    <Card className="flex flex-col mx-2 my-5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Employees by Departments</CardTitle>
        <CardDescription>{today.toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <EmployeeCountChart
          chartConfig={chartConfig}
          chartData={chartData}
          totalEmployees={totalEmployees}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm items-end">
        <Link href={"/dashboard/employees"}>
          <Button type="submit" className="w-full cursor-pointer">
            Go to Employees
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
