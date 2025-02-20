"use client";
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
    <HStack gap="2" className={` text-olive border border-olive text-base font-semibold px-2 rounded-md ${bg}`}>
      <Icon size={16} />
      <InputGroup flex="1">
        <input value={value} type="text" placeholder={placeholder} onChange={onChange} className="w-full bg-transparent focus:outline-none focus:ring-0 focus:border-transparent" />
      </InputGroup>
    </HStack>
  );
};

export default InputElement;
