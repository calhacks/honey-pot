"use client";

import { Result, useAtomValue } from "@effect-atom/atom-react";
import { IconQuestionMark } from "@tabler/icons-react";
import { GetCurrentProfileAtom } from "@/atoms/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export default function SidebarProfile() {
	const profile = useAtomValue(GetCurrentProfileAtom);

	const profileAvatarUrl = Result.getOrElse(profile, () => undefined)?.avatar_url ?? undefined;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg">
							<Avatar className="h-8 w-8 rounded-sm shrink-0">
								<AvatarImage src={profileAvatarUrl} alt="Profile avatar" />
								<AvatarFallback className="rounded-sm">
									<IconQuestionMark className="size-5" />
								</AvatarFallback>
							</Avatar>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
