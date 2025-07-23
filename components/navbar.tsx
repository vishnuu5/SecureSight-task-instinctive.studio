"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Settings,
  AlertTriangle,
  Users,
  ChevronDown,
  CuboidIcon as Cube,
} from "lucide-react";
import { GiPistolGun } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-700 px-4 sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 flex-wrap sm:flex-nowrap">
        {/* Logo + Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 gap-2 sm:gap-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <Image
                src="/Icon_container.png"
                alt="Icon Logo"
                width={34}
                height={34}
                className="w-6 h-6"
              />
            </div>
            <p className="text-white font-bold text-lg">
              <span className="text-white font-light text-lg">MANDLAC</span>X
            </p>
          </Link>

          <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 sm:space-x-6 mt-2 sm:mt-0">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:bg-slate-700 flex items-center space-x-2"
              >
                <LayoutDashboard className="w-4 h-4 text-yellow-400" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-slate-300 hover:bg-slate-700 flex items-center space-x-2"
            >
              <GiPistolGun className="w-4 h-4" />
              <span>Cameras</span>
            </Button>
            <Button
              variant="ghost"
              className="text-slate-300 hover:bg-slate-700 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Scenes</span>
            </Button>
            <Button
              variant="ghost"
              className="text-slate-300 hover:bg-slate-700 flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Incidents</span>
            </Button>
            <Button
              variant="ghost"
              className="text-slate-300 hover:bg-slate-700 flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Users</span>
            </Button>
          </div>
        </div>

        {/* Avatar & Dropdown - stay inline on desktop */}
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:bg-slate-700 flex items-center space-x-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/user_profile.png?height=32&width=32" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">Mohammed Ajhas</div>
                  <div className="text-xs text-slate-400">
                    ajhas@mandlac.com
                  </div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-400">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
