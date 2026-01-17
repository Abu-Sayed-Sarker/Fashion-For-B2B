import DashboardProgressHeader from "@/Components/Layouts/DashboardProgressHeader";
export const metadata = {
  title: "Dashboard",
  description: "Application dashboard layout",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardProgressHeader />
      {children}
    </>
  );
}
