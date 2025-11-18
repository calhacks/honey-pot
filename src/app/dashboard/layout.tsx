import type { PropsWithChildren } from "react";
import DashboardSidebar from "@/components/dashboard-sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout(props: PropsWithChildren) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset />
		</SidebarProvider>
	);
}
