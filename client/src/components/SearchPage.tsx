import { ChangeEvent, FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import heroImg from "@/assets/heroImg.png";

const Search: FC = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search input field */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant and cuisines "
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>
          {/* searched item display here */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">(2) search results found</h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {["Pizza", "Biryani", "Noodles"].map(
                  (selectedFilter: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative inline-flex items-center max-w-full"
                    >
                      <Badge
                        className="pr-6 text-[#d19254] rounded-md cursor-pointer whitespace-nowrap"
                        variant="outline"
                      >
                        {selectedFilter}
                      </Badge>
                      <X
                        size={16}
                        className="absolute text-[#d19254] right-1 hover:cursor-pointer"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {/* Restaurant cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item: number, idx: number) => (
                <Card
                  key={idx}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 6}>
                      <img
                        src={heroImg}
                        alt="pizza"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute top-2 left-2 bg-gray-200  dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Pizza Hunt
                    </h1>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      <p className="text-sm">
                        City: <span className="font-medium">Dhaka</span>
                      </p>
                    </div>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                      <Globe size={16} />
                      <p className="text-sm">
                        Country: <span className="font-medium">Bangladesh</span>
                      </p>
                    </div>
                    <div className="flex flex-wrap mt-4 gap-2">
                      {["Pizza", "Biryani", "Noodles"].map(
                        (cuisine: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="font-medium px-2 py-1 rounded-full shadow-sm"
                          >
                            {cuisine}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                    <Link to={`/restaurant/${params.id}`}>
                      <Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                        View Menu
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
