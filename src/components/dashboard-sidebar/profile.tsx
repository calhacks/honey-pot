"use client";

import { Result, useAtomSet, useAtomValue } from "@effect-atom/atom-react";
import { IconLogout, IconQuestionMark } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { SignOutAtom } from "@/atoms/auth";
import { GetCurrentProfileAtom } from "@/atoms/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SidebarProfile() {
	const profile = useAtomValue(GetCurrentProfileAtom);
	const signOut = useAtomSet(SignOutAtom, { mode: "promiseExit" });

	const isMobile = useIsMobile();
	const router = useRouter();

	const profileAvatarUrl = Result.getOrElse(profile, () => undefined)?.avatar_url ?? undefined;

	async function handleSignOut() {
		await signOut({ payload: {} });
		router.push("/login");
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg">
							<Avatar className="h-8 w-8 shrink-0 rounded-sm">
								<AvatarImage src={profileAvatarUrl} alt="Profile avatar" />
								<AvatarFallback className="rounded-sm">
									<IconQuestionMark className="size-5" />
								</AvatarFallback>
							</Avatar>

							<div className="grid flex-1 text-left">
								{Result.matchWithWaiting(profile, {
									onDefect: () => <></>,
									onError: () => <></>,
									onSuccess: (profile) => (
										<>
											<span className="truncate font-medium text-sm">
												{profile.value.first_name} {profile.value.last_name}
											</span>
											<span className="truncate text-muted-foreground text-xs">
												{profile.value.email}
											</span>
										</>
									),
									onWaiting: () => (
										<>
											{/*<Skeleton className="h-3 w-20" />
											<Skeleton className="h-3 w-20" />*/}
										</>
									),
								})}
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
						className="min-w-56 rounded-lg"
					>
						<DropdownMenuLabel className="font-normal">
							<div className="flex items-center gap-2 text-left">
								<Avatar className="h-8 w-8 shrink-0 rounded-sm">
									<AvatarImage src={profileAvatarUrl} alt="Profile avatar" />
									<AvatarFallback className="rounded-sm">
										<IconQuestionMark className="size-5" />
									</AvatarFallback>
								</Avatar>

								<div className="grid flex-1 text-left">
									{Result.matchWithWaiting(profile, {
										onDefect: () => <></>,
										onError: () => <></>,
										onSuccess: (profile) => (
											<>
												<span className="truncate font-medium text-sm">
													{profile.value.first_name} {profile.value.last_name}
												</span>
												<span className="truncate text-muted-foreground text-xs">
													{profile.value.email}
												</span>
											</>
										),
										onWaiting: () => (
											<>
												<Skeleton className="h-3 w-20" />
												<Skeleton className="h-3 w-20" />
											</>
										),
									})}
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem onClick={handleSignOut}>
								<IconLogout />
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
