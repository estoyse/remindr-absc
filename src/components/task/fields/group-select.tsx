import { useState, useMemo } from "react";
import {
  Combobox,
  Field,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { Controller, type Control } from "react-hook-form";
import { ComboboxMultiSelectValue } from "../../ui/multi-select-value";
import { type SelectItem, type TaskFormValues } from "../../../types";

interface GroupSelectProps {
  control: Control<TaskFormValues>;
  groupCollection: ReturnType<typeof createListCollection<SelectItem>>;
}

export const GroupSelect = ({ control, groupCollection }: GroupSelectProps) => {
  const [groupSearch, setGroupSearch] = useState("");

  const filteredGroupItems = useMemo(() => {
    if (!groupSearch) return groupCollection.items;
    return groupCollection.items.filter(item =>
      item.label.toLowerCase().includes(groupSearch.toLowerCase())
    );
  }, [groupSearch, groupCollection.items]);

  return (
    <Field.Root key='group-select'>
      <Field.Label>Group</Field.Label>
      <Field.RequiredIndicator />
      <Controller
        name='group'
        control={control}
        render={({ field }) => (
          <Combobox.Root
            multiple
            collection={groupCollection}
            value={field.value}
            onValueChange={e => field.onChange(e.value)}
            inputValue={groupSearch}
            onInputValueChange={e => setGroupSearch(e.inputValue)}
            onOpenChange={e => {
              if (!e.open) setGroupSearch("");
            }}
            closeOnSelect
          >
            <Combobox.Control>
              <Combobox.Input placeholder='Select group' />
              <Combobox.Trigger>
                <ComboboxMultiSelectValue showAvatar={false} />
              </Combobox.Trigger>
            </Combobox.Control>
            <Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  {filteredGroupItems.map((item: SelectItem) => (
                    <Combobox.Item
                      item={item}
                      key={item.value}
                      justifyContent='flex-start'
                    >
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
