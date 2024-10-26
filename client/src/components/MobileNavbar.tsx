import {
  HandPlatter,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logo from "../assets/logo.svg";
import { FC } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const MobileNavbar: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant="outline"
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <img src={logo} alt="logo" className="w-24 " />
          </SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-lg cursor-pointer font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-lg cursor-pointer font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-lg cursor-pointer font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          <Link
            to="/admin/add-menu"
            className="flex items-center gap-4 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-lg cursor-pointer font-medium"
          >
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link
            to="/admin/restaurant"
            className="flex items-center gap-4 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-lg cursor-pointer font-medium"
          >
            <UtensilsCrossed />
            <span>Restaurant</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-lg cursor-pointer font-medium"
          >
            <PackageCheck />
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4 ">
          <div className="flex flex-row items-center gap-2 w-full">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Saiful Islam</h1>
          </div>
          <SheetClose asChild>
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavbar;
