import EventDropdown from "@/components/dashboard-sidebar/event-dropdown";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export interface DashboardSidebarProps {
	sidebar?: React.ComponentProps<typeof Sidebar>;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props.sidebar}>
			<SidebarHeader>
				<EventDropdown />
			</SidebarHeader>
			<SidebarContent></SidebarContent>
			<SidebarFooter></SidebarFooter>
			<SidebarRail></SidebarRail>
		</Sidebar>
	);
}
