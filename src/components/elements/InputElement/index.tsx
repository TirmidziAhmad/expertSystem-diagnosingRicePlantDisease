import { HStack } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { IconType } from "react-icons";

interface InputElementProps {
  icon: IconType;
  bg?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputElement: React.FC<InputElementProps> = ({ icon: Icon, bg, onChange, value, placeholder }) => {
  return (
    <HStack gap="10" width="full" className={` text-olive border border-olive text-base font-semibold gap-4 px-3 py-2 rounded-md mt-4 ${bg}`}>
      <Icon size={16} />
      <InputGroup flex="1">
        <input value={value} type="text" placeholder={placeholder} onChange={onChange} className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent" />
      </InputGroup>
    </HStack>
  );
};

export default InputElement;
