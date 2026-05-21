import ProfileCard from "../components/ProfileCard";

export default function DashboardPage() {
  return (
    <>
      <ProfileCard />
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Select an item from sidebar
        </p>
      </div>
    </>
  );
}
