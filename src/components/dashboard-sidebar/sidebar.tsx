import EventDropdown from "@/components/dashboard-sidebar/event-dropdown";
import SidebarNav from "@/components/dashboard-sidebar/nav";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

export interface DashboardSidebarProps {
	sidebar?: React.ComponentProps<typeof Sidebar>;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props.sidebar}>
			<SidebarHeader>
				<EventDropdown />
			</SidebarHeader>
			<SidebarContent>
				<SidebarNav />
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);
}
