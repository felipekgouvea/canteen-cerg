import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex gap-4 px-5">
      <Input placeholder="Buscar por um produto..." className="border-none" />
      <Button size="icon" variant="destructive">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
