import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { CardItems } from "./CardItems";

const CardTotal: React.FC = () => {
  return (
    <div className="mt-3 gap-4 w-[50%]">
      {CardItems.map((item, index) => (
        <Box
          key={index}
          className={`${item.backgroundColor} border rounded-lg py-4 px-6 mb-2`}
        >
          <Flex direction="row" align="center" justify="flex-start">
            <Image src={item.imageSrc} alt={item.title} className="w-16 mr-4" /> 
            <Flex direction="column" ml={6} color="white"> 
            <Text className="text-2xl font-semibold">{item.title}</Text> 
            <Text className="text-2xl font-bold">{item.value}</Text> 
          </Flex>
          </Flex>
        </Box>
      ))}
    </div>
  );
};

export default CardTotal;
