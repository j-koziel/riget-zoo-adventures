import { Input } from "./ui/input";
import { Label } from "./ui/label";

/**
 * Common search input component
 * @param {{value: string, setValue: React.Dispatch<React.SetStateAction<string>>, id: string, label: string, name: string, placeholder: string, description: string }} props
 * @returns
 */
export function SearchInput({
  value,
  setValue,
  id,
  label,
  name,
  placeholder,
  description,
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="text"
        id={id}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-foreground/60">{description}</p>
    </div>
  );
}
