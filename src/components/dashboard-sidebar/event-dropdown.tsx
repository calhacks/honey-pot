"use client";

import { Result, useAtomSet, useAtomValue } from "@effect-atom/atom-react";
import { IconQuestionMark } from "@tabler/icons-react";
import { Array, Option } from "effect";
import { ChevronsUpDown } from "lucide-react";
import { ActiveEventAtom, GetAllEventsAtom } from "@/atoms/events";
import { LocalStorageActiveEventIdAtom } from "@/atoms/local-storage";
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

export default function EventDropdown() {
	const eventsResult = useAtomValue(GetAllEventsAtom);
	const activeEventResult = useAtomValue(ActiveEventAtom);
	const setActiveEventId = useAtomSet(LocalStorageActiveEventIdAtom);

	const isMobile = useIsMobile();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton size="lg">
					<Avatar className="h-8 w-8 rounded-sm">
						<AvatarImage src="" />
						<AvatarFallback>
							<IconQuestionMark className="size-5" />
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-1 flex-col text-left text-sm leading-tight">
						<span className="max-w-40 truncate font-medium">
							{Result.matchWithWaiting(activeEventResult, {
								onDefect: () => "",
								onError: () => "",
								onSuccess: (event) =>
									Option.match(event.value, { onNone: () => "", onSome: (event) => event.title }),
								// onWaiting: () => <Skeleton className="h-5 w-20" />,
								onWaiting: () => "",
							})}
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
				{Result.matchWithWaiting(eventsResult, {
					onDefect: () => "",
					onError: () => "",
					onSuccess: (events) =>
						events.value.map((event) => (
							<DropdownMenuItem
								key={event.id}
								onClick={() => setActiveEventId(event.id)}
								className="gap-2 p-2"
							>
								<Avatar className="h-6 w-6 shrink-0 rounded-sm">
									<AvatarImage src={event.avatar_url ?? undefined} className="size-5" />
									<AvatarFallback>
										<IconQuestionMark className="size-4" />
									</AvatarFallback>
								</Avatar>

								<span className="truncate">{event.title}</span>
							</DropdownMenuItem>
						)),
					onWaiting: () =>
						// <DropdownMenuItem className="gap-2 p-2">
						// 	<Skeleton className="size-6" />
						// 	<Skeleton className="h-5 w-20" />
						// </DropdownMenuItem>
						"",
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
