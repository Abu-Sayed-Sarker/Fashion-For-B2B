import DashboardLayoutClient from "@/Components/Dashboard/Dashboard Layout/Layouts/DashboardLayoutClient";
export const metadata = {
  title: "Dashboard",
  description: "Application dashboard layout",
};

export default function DashboardLayout({ children }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
