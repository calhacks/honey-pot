import type { PropsWithChildren } from "react";
import DashboardHeader from "@/components/dashboard-header/header";
import DashboardSidebar from "@/components/dashboard-sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout(props: PropsWithChildren) {
	return (
		<SidebarProvider>
			<DashboardSidebar sidebar={{ variant: "inset" }} />
			<SidebarInset>
				<DashboardHeader />
				<div className="flex flex-1">{props.children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
