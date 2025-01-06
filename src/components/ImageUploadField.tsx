import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ImageUploadFieldProps {
  control: any;
  name: string;
  label: string;
}

const ImageUploadField = ({ control, name, label }: ImageUploadFieldProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: (value: File) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, onChange)}
                {...field}
              />
              {preview && (
                <Avatar className="w-24 h-24">
                  <AvatarImage src={preview} alt={label} />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploadField;