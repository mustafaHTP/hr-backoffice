import EmployeeCountCard from "../components/employee-count-card";
import ProfileCard from "../components/profile-card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <ProfileCard />
      <EmployeeCountCard />
    </div>
  );
}
