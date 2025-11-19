"use client";

import { Result, useAtomSet, useAtomValue } from "@effect-atom/atom-react";
import { ChevronsUpDown, CircleQuestionMarkIcon } from "lucide-react";
import { GetAllEventsAtom } from "@/atoms/events";
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
import { useIsMobile } from "@/hooks/use-mobile";
import type { Event } from "@/schema/supabase";

export default function EventDropdown() {
	const eventsResult = useAtomValue(
		GetAllEventsAtom,
		Result.map((events) => Object.fromEntries(events.map((event) => [event.id, event]))),
	);
	const events = Result.getOrElse(eventsResult, () => ({}) as Record<string, Event>);

	const activeEventId = useAtomValue(activeEventAtom);
	const setActiveEventId = useAtomSet(activeEventAtom, { mode: "value" });

	const isMobile = useIsMobile();

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
						<span className="max-w-40 truncate font-medium">
							{activeEventId ? (events[activeEventId]?.title ?? "No Event") : "No Event"}
						</span>
					</div>

					<ChevronsUpDown className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				align="start"
				side={isMobile ? "bottom" : "right"}
				sideOffset={4}
			>
				<DropdownMenuLabel className="text-muted-foreground text-xs">Events</DropdownMenuLabel>
				{Object.values(events).map((event) => (
					<DropdownMenuItem key={event.id} onClick={() => setActiveEventId(event.id)} className="gap-2 p-2">
						<Avatar className="size-6 rounded-sm shrink-0">
							<AvatarImage src={event.avatar_url ?? ""} />
							<AvatarFallback>
								<CircleQuestionMarkIcon className="size-4" />
							</AvatarFallback>
						</Avatar>

						<span className="truncate">{event.title}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
