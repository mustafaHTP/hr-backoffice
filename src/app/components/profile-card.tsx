import { getSessionAsync } from "@/lib/auth";
import { getUserAsync } from "@/lib/dal/user";
import { getEmployeeAsync } from "@/lib/dal/employee";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function ProfileCard() {
  const session = await getSessionAsync();
  if (!session) return null;

  const user = await getUserAsync(session.userId);
  if (!user?.employeeId) return null;
  const employee = await getEmployeeAsync(user.employeeId);
  if (!employee) return null;

  return (
    <>
      <Card className="w-full mx-2 my-5">
        <CardHeader>
          <CardTitle>{employee.firstName + " " + employee.lastName}</CardTitle>
          <CardDescription>
            <div>{employee.title?.name ?? "Unassigned"}</div>
            <div>{employee.department?.name ?? "Unassigned"}</div>
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <dl className="flex items-center justify-between">
            <dt>Hire Date</dt>
            <dd className="text-muted-foreground">
              {employee.hireDate?.toDateString() ?? "Not hired"}
            </dd>
          </dl>
        </CardContent>
        <CardFooter className="flex-col gap-2 items-end">
          <Link href={"/dashboard/profile"}>
            <Button type="submit" className="w-full cursor-pointer">
              My Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
