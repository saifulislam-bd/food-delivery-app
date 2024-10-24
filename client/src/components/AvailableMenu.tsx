import { FC } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const AvailableMenu: FC = () => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Chicken Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              impedit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price: <span className="text-[#d19524]">৳450</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full bg-orange hover:bg-hoverOrange">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AvailableMenu;
