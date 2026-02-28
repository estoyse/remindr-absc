import { useState, useMemo } from "react";
import {
  Avatar,
  Combobox,
  Field,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { Controller, type Control } from "react-hook-form";
import { ComboboxMultiSelectValue } from "../../ui/multi-select-value";
import { type SelectItem, type TaskFormValues } from "../../../types";

interface PersonSelectProps {
  control: Control<TaskFormValues>;
  userCollection: ReturnType<typeof createListCollection<SelectItem>>;
}

export const PersonSelect = ({
  control,
  userCollection,
}: PersonSelectProps) => {
  const [personSearch, setPersonSearch] = useState("");

  const filteredUserItems = useMemo(() => {
    if (!personSearch) return userCollection.items;
    return userCollection.items.filter(item =>
      item.label.toLowerCase().includes(personSearch.toLowerCase())
    );
  }, [personSearch, userCollection.items]);

  return (
    <Field.Root key='person-select'>
      <Field.Label>Person</Field.Label>
      <Field.RequiredIndicator />
      <Controller
        name='person'
        control={control}
        render={({ field }) => (
          <Combobox.Root
            multiple
            collection={userCollection}
            value={field.value}
            onValueChange={e => field.onChange(e.value)}
            inputValue={personSearch}
            onInputValueChange={e => setPersonSearch(e.inputValue)}
            onOpenChange={e => {
              if (!e.open) setPersonSearch("");
            }}
            closeOnSelect
          >
            <Combobox.Control>
              <Combobox.Input placeholder='Select person' />
              <Combobox.Trigger>
                <ComboboxMultiSelectValue showAvatar={true} />
              </Combobox.Trigger>
            </Combobox.Control>
            <Portal>
              <Combobox.Positioner>
                <Combobox.Content mt='2'>
                  {filteredUserItems.map((item: SelectItem) => (
                    <Combobox.Item
                      item={item}
                      key={item.value}
                      justifyContent='flex-start'
                    >
                      {item.avatar && (
                        <Avatar.Root shape='rounded' size='2xs'>
                          <Avatar.Image src={item.avatar} alt={item.label} />
                          <Avatar.Fallback name={item.label} />
                        </Avatar.Root>
                      )}
                      {item.label}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </Combobox.Root>
        )}
      />
    </Field.Root>
  );
};
