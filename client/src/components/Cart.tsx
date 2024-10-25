import { FC, useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Minus, Plus } from "lucide-react";
import ConfirmCheckout from "./ConfirmCheckout";

const Cart: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="">
        <Button variant="link">Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>SI</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>Chicken Biryani</TableCell>
            <TableCell> Tk. 450</TableCell>
            <TableCell>
              <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-gray-200"
                >
                  <Minus />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="font-bold border-none"
                  disabled
                >
                  1
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-orange hover:bg-hoverOrange"
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell>Tk. 450</TableCell>
            <TableCell className="text-right">
              <Button size="sm" className="bg-orange hover:bg-hoverOrange ">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="text-xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">Tk. 450</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          className="bg-orange hover:bg-hoverOrange "
          onClick={() => setOpen(true)}
        >
          Proceed to Checkout
        </Button>
      </div>
      <ConfirmCheckout open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
