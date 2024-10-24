import { FC } from "react";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";

const RestaurantDetails: FC = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 ">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src="https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="pizza"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="text-xl font-medium">Pizza Hut</h1>
            <div className="flex gap-2 my-2">
              {["Biryani", "Pizza", "Noodles"].map(
                (cuisine: string, idx: number) => (
                  <Badge key={idx}>{cuisine}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#d19254]">30 min</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <AvailableMenu />
      </div>
    </div>
  );
};

export default RestaurantDetails;
