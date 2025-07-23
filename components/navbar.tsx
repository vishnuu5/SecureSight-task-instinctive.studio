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
    <nav className="bg-slate-950 border-b border-slate-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
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

          <div className="flex items-center space-x-6">
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
            {/* <Link href="/3d">
              <Button
                variant="ghost"
                className="text-slate-300 hover:bg-slate-700 flex items-center space-x-2"
              >
                <Cube className="w-4 h-4" />
                <span>3D View</span>
              </Button>
            </Link> */}
          </div>
        </div>

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
              <div className="text-left">
                <div className="text-sm font-medium">Mohammed Ajhas</div>
                <div className="text-xs text-slate-400">ajhas@mandlac.com</div>
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
    </nav>
  );
}
