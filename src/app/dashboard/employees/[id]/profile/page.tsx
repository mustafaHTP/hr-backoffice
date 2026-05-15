import { getEmployeeAsync } from "@/lib/dal/employee";
import { notFound } from "next/navigation";
import { getInitials } from "@/lib/utils/utility";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";

type EmployeeProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeProfilePage({
  params,
}: EmployeeProfilePageProps) {
  const { id } = await params;
  const employee = await getEmployeeAsync(Number(id));
  if (!employee) {
    notFound();
  }

  const fullName = `${employee.firstName} ${employee.lastName}`.trim();
  const avatarFallback = getInitials(employee.firstName, employee.lastName);
  const titleName = employee.title?.name ?? "-";
  const departmentName = employee.department?.name ?? "-";
  const phone = employee.phone ?? "-";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-8 dark:border-zinc-800">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-semibold text-zinc-950 dark:text-white">
              {fullName}
            </h1>
            <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
              {titleName}
            </p>
          </div>

          <Avatar.Root className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
            <Avatar.Image
              className="h-full w-full object-cover"
              src=""
              alt={fullName}
            />
            <Avatar.Fallback
              className="select-none text-sm font-semibold text-zinc-700 dark:text-zinc-200"
              delayMs={200}
            >
              {avatarFallback}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>

        {/* Body */}
        <div className="p-8">
          <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InfoItem label="Department" value={departmentName} />
            <InfoItem label="Title" value={titleName} />
          </dl>
        </div>
      </div>

      {/* Contact Card */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            Contact
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Employee #{employee.id}
          </span>
        </div>

        <div className="p-6">
          <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
              <p className="font-medium text-zinc-950 dark:text-white">
                <a
                  className="break-all underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:decoration-zinc-700 dark:hover:decoration-zinc-500"
                  href={`mailto:${employee.email}`}
                >
                  {employee.email}
                </a>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Phone</p>
              <p className="font-medium text-zinc-950 dark:text-white">
                {employee.phone ? (
                  <a
                    className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:decoration-zinc-700 dark:hover:decoration-zinc-500"
                    href={`tel:${employee.phone.replace(/\s+/g, "")}`}
                  >
                    {phone}
                  </a>
                ) : (
                  phone
                )}
              </p>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="font-medium text-zinc-950 dark:text-white">{value}</p>
    </div>
  );
}
