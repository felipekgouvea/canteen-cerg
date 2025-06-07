import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export const CLASS = [
  { value: "SELECIONE", label: "Selecione" },
  { value: "MATERNAL", label: "MATERNAL" },
  { value: "PRE_I", label: "PRÉ I" },
  { value: "PRE_II", label: "PRÉ II" },
  { value: "PRIMEIRO_ANO", label: "1º ANO" },
  { value: "SEGUNDO_ANO", label: "2º ANO" },
  { value: "TERCEIRO_ANO", label: "3º ANO" },
  { value: "QUARTO_ANO", label: "4º ANO" },
  { value: "QUINTO_ANO", label: "5º ANO" },
];

const ClassSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione a Série" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {CLASS.map((option) => (
          <SelectItem
            className="w-full"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClassSelect;
