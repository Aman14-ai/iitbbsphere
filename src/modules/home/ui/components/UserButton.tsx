import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React from "react";
import { LogOut, User, Settings, HelpCircle } from "lucide-react";
import { ModeToggle } from "@/components/ModdleToggler";

type Props = {
  name: string;
  email: string;
  image: string;
  onSignOut: () => void;
};

const UserButton = ({ name, email, image, onSignOut }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer focus:outline-none"
        asChild
      >
        <div className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-colors">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border">
            <Image
              src={image}
              alt="User profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-primary">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-2" align="end">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium text-primary">{name}</p>
          <p className="text-xs text-gray-500 truncate">{email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer px-2 py-1.5 rounded-sm flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-2 py-1.5 rounded-sm flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer px-2 py-1.5 rounded-sm flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer px-2 py-1.5 rounded-sm flex items-center gap-2 text-red-600 focus:text-red-700 focus:bg-red-50"
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
