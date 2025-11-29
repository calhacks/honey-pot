import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardHeader() {
	return (
		<header className="flex h-12 shrink-0 items-center border-b">
			<div className="flex w-full items-center gap-1 px-4">
				<SidebarTrigger></SidebarTrigger>
			</div>
		</header>
	);
}
