"use client";

import { Result, useAtomSet, useAtomValue } from "@effect-atom/atom-react";
import { ChevronsUpDown, CircleQuestionMarkIcon } from "lucide-react";
import { activeEventAtom } from "@/atoms/local-storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Client } from "@/rpc/client/browser";

export default function EventDropdown() {
	const events = useAtomValue(Client.query("GetAllEvents", {}, { reactivityKeys: ["get-all-events"] }), (events) =>
		Result.map(events, (events) => Object.fromEntries(events.map((event) => [event.id, event]))),
	);

	// const activeEventId = useAtomValue(activeEventAtom);
	// const setActiveEventId = useAtomSet(activeEventAtom, { mode: "value" });

	// const isMobile = useIsMobile();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton size="lg">
					<Avatar className="size-7 rounded-sm">
						<AvatarImage src="" />
						<AvatarFallback>
							<CircleQuestionMarkIcon className="size-5" />
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-1 flex-col text-left text-sm leading-tight">
						{Result.matchWithWaiting(events, {
							// onWaiting: () => <Skeleton className="h-4 w-20" />,
							onWaiting: () => <></>,
							onError: () => <></>,
							onDefect: () => <></>,
							onSuccess: (events) => (
								<span className="max-w-40 truncate font-medium">
									{/*{activeEventId ? (events.value[activeEventId]?.title ?? "No Event") : "No Event"}*/}
								</span>
							),
						})}
					</div>

					<ChevronsUpDown className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				align="start"
				// side={isMobile ? "bottom" : "right"}
				sideOffset={4}
			>
				<DropdownMenuLabel className="text-muted-foreground text-xs">Events</DropdownMenuLabel>
				{/*{Result.matchWithWaiting(events, {
					onWaiting: () => <></>,
					onError: () => <></>,
					onDefect: () => <></>,
					onSuccess: (events) =>
						Object.values(events.value).map((event) => (
							<DropdownMenuItem key={event.id} className="gap-2 p-2">
								<Avatar className="size-6 rounded-sm shrink-0">
									<AvatarImage src={event.avatar_url ?? ""} />
									<AvatarFallback>
										<CircleQuestionMarkIcon className="size-4" />
									</AvatarFallback>
								</Avatar>

								{event.title}
							</DropdownMenuItem>
						)),
				})}*/}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
