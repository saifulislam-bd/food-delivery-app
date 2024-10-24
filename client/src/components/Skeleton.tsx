import { FC } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MapPin, Globe } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

const SearchSkeleton: FC = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-pulse">
      <div className="relative">
        <AspectRatio ratio={16 / 6}>
          <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </AspectRatio>
        <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="text-gray-200 dark:text-gray-700" />
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
          <Globe size={16} className="text-gray-200 dark:text-gray-700" />
          <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
        <div className="flex flex-wrap mt-4 gap-2">
          {[1, 2, 3].map((_, idx) => (
            <Badge
              key={idx}
              className="font-medium px-2 py-1 rounded-full shadow-sm bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
        <Link to={`/restaurant/`}>
          <Button className="bg-gray-200 dark:bg-gray-700 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
            <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SearchSkeleton;
