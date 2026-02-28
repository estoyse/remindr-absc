import {
  Avatar,
  Badge,
  HStack,
  Select,
  useSelectContext,
} from "@chakra-ui/react";
import { type SelectItem } from "../../data/types";

export const MultiSelectValue = ({
  placeholder,
  showAvatar = false,
}: {
  placeholder: string;
  showAvatar?: boolean;
}) => {
  const select = useSelectContext();
  const items = select.selectedItems as SelectItem[];
  if (items.length === 0) return <Select.ValueText placeholder={placeholder} />;

  return (
    <Select.ValueText placeholder={placeholder}>
      <HStack wrap='wrap' gap='1'>
        {items.map(item => (
          <Badge
            key={item.value}
            variant='surface'
            rounded='full'
            textTransform='none'
            px='2'
            py='1'
            size='sm'
            colorPalette={item.colorPalette || "gray"}
          >
            <HStack gap='2'>
              {showAvatar && item.avatar && (
                <Avatar.Root size='2xs'>
                  <Avatar.Image src={item.avatar} alt={item.label} />
                  <Avatar.Fallback name={item.label} />
                </Avatar.Root>
              )}
              {item.label}
            </HStack>
          </Badge>
        ))}
      </HStack>
    </Select.ValueText>
  );
};
