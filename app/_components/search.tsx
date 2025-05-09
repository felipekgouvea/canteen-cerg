"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurant/canteen-cerg/products?search=${search}`);
  };

  return (
    <form className="flex gap-4 px-5" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar por um produto..."
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" variant="destructive">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
