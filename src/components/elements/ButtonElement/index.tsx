import { HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import Link from "next/link";

interface ButtonElementProps {
  label: string; 
  icon: IconType; 
  variant?: "solid" | "outline"; 
  colorScheme?: string; 
  bg? : string;
  link? : string;
}

const ButtonElement: React.FC<ButtonElementProps> = ({
  label,
  icon: Icon,
  variant = "solid",
  colorScheme = "teal",
  bg= "transparent",
  link,
}) => {
 
  return (
    <HStack  width="fit-content" className={`text-white text-lg font-semibold gap-4 px-4 py-2 rounded-md mt-4 ${bg}`}>
      <Icon size={20} color={variant === "solid" ? colorScheme : `${colorScheme}.500`} /> 
      {link && (
        <Link href={link}>
          <div>
      <Button 
        colorScheme={colorScheme} 
        variant={variant}
      >
        {label}
      </Button>
      </div>
        </Link>
      )}
    </HStack>
  );
};

export default ButtonElement;
