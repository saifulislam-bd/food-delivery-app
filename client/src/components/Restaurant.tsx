import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {
  restaurantFormSchema,
  RestaurantFormState,
} from "@/schema/restaurantSchema";
const initialData = {
  restaurantName: "",
  city: "",
  country: "",
  deliveryTime: 0,
  cuisines: [],
  image: {} as File,
};

const Restaurant: FC = () => {
  const loading = false;
  const existingRestaurant = false;

  const [input, setInput] = useState<RestaurantFormState>(initialData);
  const [errors, setErrors] = useState<Partial<RestaurantFormState>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormState>);
      return;
    }
    console.log(input);
    setInput(initialData);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
          <form onSubmit={handleSubmit}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  value={input.restaurantName}
                  name="restaurantName"
                  placeholder="Enter your restaurant name"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  value={input.city}
                  name="city"
                  placeholder="Enter city"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">{errors.city}</span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  value={input.country}
                  name="country"
                  placeholder="Enter country"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">{errors.country}</span>
                )}
              </div>
              <div>
                <Label>Estimated Delivery Time [minute]</Label>
                <Input
                  type="number"
                  value={input.deliveryTime}
                  name="deliveryTime"
                  placeholder="Delivery Time"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  value={input.cuisines}
                  name="cuisines"
                  placeholder="e.g. Italian, Indian, Chinese"
                  onChange={(e) =>
                    setInput((prev) => ({
                      ...prev,
                      cuisines: e.target.value.split(","),
                    }))
                  }
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Restaurant Banner</Label>
                <Input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) =>
                    setInput((prev) => ({
                      ...prev,
                      image: e.target.files?.[0] || prev.image,
                    }))
                  }
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.image?.name ||
                      "Restaurant banner image is required"}
                  </span>
                )}
              </div>
            </div>
            <div className="m-5 w-fit">
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-orange hover:bg-hoverOrange"
                >
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-orange hover:bg-hoverOrange"
                >
                  {existingRestaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
