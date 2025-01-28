import { HStack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { IconType } from 'react-icons';

interface ButtonElementProps {
  label: string;
  icon: IconType;
  variant?: 'solid' | 'outline';
  colorScheme?: string;
  bg?: string;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonElement: React.FC<ButtonElementProps> = ({ label, icon: Icon, variant = 'solid', colorScheme = 'teal', bg = 'transparent', link, onClick }) => {
  return (
    <HStack width='fit-content' className={`text-white text-base font-semibold gap-4 py-2 px-4 rounded-md ${bg}`}>
      <Icon size={16} color={variant === 'solid' ? colorScheme : `${colorScheme}.500`} />
      {link ? (
        <a href={link}>
          <Button colorScheme={colorScheme} variant={variant} onClick={onClick}>
            {label}
          </Button>
        </a>
      ) : (
        <Button colorScheme={colorScheme} variant={variant} onClick={onClick}>
          {label}
        </Button>
      )}
    </HStack>
  );
};

export default ButtonElement;
