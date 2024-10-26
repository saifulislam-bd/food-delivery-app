import EditMenu from "@/admin/EditMenu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuSchema, menuState } from "@/schema/menuSchema";
import { Loader2, Plus } from "lucide-react";
import { ChangeEvent, FC, FormEvent, useState } from "react";

const menus = [
  {
    id: 1,
    name: "Pizza",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloremque.",
    price: 100,
    image:
      "https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Pizza",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, doloremque.",
    price: 100,
    image:
      "https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const initialData = {
  name: "",
  description: "",
  price: 0,
  image: {} as File,
};

const AddMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [input, setInput] = useState<menuState>(initialData);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<menuState>>({});
  const loading = false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<menuState>);
      return;
    }
    // API implementation
    setInput(initialData);
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="md:text-2xl text-lg md:font-extrabold font-bold">
          Available Menus
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="mr-2" /> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a new menu that will make your restaurant stand out
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  placeholder="Enter menu name"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">{errors.name}</span>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  placeholder="Enter menu description"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">
                    {errors.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price (in taka)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  placeholder="Enter menu price"
                  onChange={handleChange}
                />
                {errors && (
                  <span className="text-xs text-red-500">{errors.price}</span>
                )}
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
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
                    {errors.image?.name || "Menu image is required"}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="w-full bg-orange hover:bg-hoverOrange"
                  >
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please
                    wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-orange hover:bg-hoverOrange"
                  >
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {menus.map((menu) => (
        <div className="mt-6 space-y-4" key={menu.id}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-gray-600 mt-1 text-sm">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#d19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              size="sm"
              className="mt-2 bg-orange hover:bg-hoverOrange"
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
