import {
  Avatar,
  Badge,
  HStack,
  Icon,
  Select,
  useSelectContext,
  useComboboxContext,
} from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import { type SelectItem } from "../../types";

interface MultiSelectProps {
  placeholder: string;
  showAvatar?: boolean;
}

export const MultiSelectValue = ({
  placeholder,
  showAvatar = false,
}: MultiSelectProps) => {
  const select = useSelectContext();
  const items = (select?.selectedItems || []) as SelectItem[];

  if (items.length === 0) return <Select.ValueText placeholder={placeholder} />;

  return (
    <HStack wrap='wrap'>
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
            <Icon
              as={HiX}
              cursor='pointer'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                select.setValue(
                  select.value.filter((v: string) => v !== item.value)
                );
              }}
            />
          </HStack>
        </Badge>
      ))}
    </HStack>
  );
};

export const ComboboxMultiSelectValue = ({
  showAvatar = false,
}: Omit<MultiSelectProps, "placeholder">) => {
  const combobox = useComboboxContext();
  const items = (combobox?.selectedItems || []) as SelectItem[];

  // Combobox doesn't always have a ValueText in the same way Select does,
  // so we handle the empty state manually or via the trigger.
  if (items.length === 0) return null;

  return (
    <HStack wrap='wrap' gap='1' mt='2'>
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
            <Icon
              as={HiX}
              cursor='pointer'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                combobox.setValue(
                  combobox.value.filter((v: string) => v !== item.value)
                );
              }}
            />
          </HStack>
        </Badge>
      ))}
    </HStack>
  );
};
