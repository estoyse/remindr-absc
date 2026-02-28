import { useState } from "react";
import { Avatar, Combobox, Field, Portal } from "@chakra-ui/react";
import { Controller, type Control } from "react-hook-form";
import { ComboboxMultiSelectValue } from "../../ui/multi-select-value";
import { type SelectItem, type TaskFormValues } from "../../../types";
import { usePerformers } from "../../../hooks/use-performers";

interface GroupSelectProps {
  control: Control<TaskFormValues>;
}

export const GroupSelect = ({ control }: GroupSelectProps) => {
  const [groupSearch, setGroupSearch] = useState("");
  const { collection, isLoading } = usePerformers({
    search: groupSearch,
    isTeamMode: true,
  });

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
            collection={collection}
            value={field.value}
            onValueChange={e => field.onChange(e.value)}
            inputValue={groupSearch}
            onInputValueChange={e => setGroupSearch(e.inputValue)}
            onOpenChange={e => {
              if (!e.open) setGroupSearch("");
            }}
            closeOnSelect
            positioning={{ placement: "top", flip: false }}
          >
            <Combobox.Control>
              <Combobox.Input placeholder='Select group' />
              <Combobox.Trigger>
                <ComboboxMultiSelectValue showAvatar={true} />
              </Combobox.Trigger>
            </Combobox.Control>
            <Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  {collection.items.map((item: SelectItem) => (
                    <Combobox.Item
                      item={item}
                      key={item.value}
                      justifyContent='flex-start'
                    >
                      <Avatar.Root shape='rounded' size='2xs'>
                        <Avatar.Image src={item.avatar} alt={item.label} />
                        <Avatar.Fallback name={item.label} />
                      </Avatar.Root>
                      {item.label}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                  {isLoading && (
                    <Combobox.Item
                      item={{
                        label: "Loading...",
                        value: "loading",
                      }}
                    >
                      {collection.items.length > 0
                        ? "Updating..."
                        : "Loading..."}
                    </Combobox.Item>
                  )}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </Combobox.Root>
        )}
      />
    </Field.Root>
  );
};
