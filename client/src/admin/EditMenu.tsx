import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuSchema, menuState } from "@/schema/menuSchema";
import { Loader2 } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type EditMenuProps = {
  selectedMenu: any;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
};

const initialData = {
  name: "",
  description: "",
  price: 0,
  image: {} as File,
};

const EditMenu: FC<EditMenuProps> = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}) => {
  const loading = false;
  const [input, setInput] = useState<menuState>(initialData);
  const [errors, setErrors] = useState<Partial<menuState>>({});

  useEffect(() => {
    setInput({
      name: selectedMenu?.name,
      description: selectedMenu?.description,
      price: selectedMenu?.price,
      image: {} as File,
    });
  }, [selectedMenu]);

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
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting
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
              <span className="text-xs text-red-500">{errors.description}</span>
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
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
