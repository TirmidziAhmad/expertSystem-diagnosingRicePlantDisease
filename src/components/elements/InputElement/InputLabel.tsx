import { HStack, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

interface InputLabelProps {
  label?: string;
  value?: string;
  placeholder?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ label, placeholder }) => {
  return (
    <HStack gap="10" width="full">
        <Field label={label} required
            className="flex flex-col w-[50%] mt-4 text-sand">
          <Input 
            placeholder={placeholder} 
            variant="subtle" 
            className="text-sm text-sand p-2 mt-1 border-2 border-sand rounded-md"/>
        </Field>
    </HStack>
  );
};

export default InputLabel;
