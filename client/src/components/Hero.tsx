import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import heroImg from "../assets/heroImg.png";

const Hero: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  return (
    <main className="flex items-center justify-center flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Our delicious food is waiting for you, we are always near to you
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 shadow-lg"
          />
          <Search className="absolute inset-y-2 text-gray-500 left-2 pointer-events-none" />

          <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
        </div>
      </div>
      <div className="">
        <img
          src={heroImg}
          alt="Pizza"
          className="object-cover w-full max-h-[500px] "
        />
      </div>
    </main>
  );
};

export default Hero;
