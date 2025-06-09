"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState, useCallback } from "react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (!search) {
        return;
      }

      router.push(`/restaurant/canteen-cerg/products?search=${search}`);
    },
    [router, search],
  );

  return (
    <form className="flex gap-4 px-5" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar por um produto..."
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
