import { useState } from "react";
import { Avatar, Combobox, Field, Portal } from "@chakra-ui/react";
import { Controller, type Control } from "react-hook-form";
import { ComboboxMultiSelectValue } from "../../ui/multi-select-value";
import { type SelectItem, type TaskFormValues } from "../../../types";
import { usePerformers } from "../../../hooks/use-performers";

interface PersonSelectProps {
  control: Control<TaskFormValues>;
}

export const PersonSelect = ({ control }: PersonSelectProps) => {
  const [personSearch, setPersonSearch] = useState("");
  const { collection, isLoading } = usePerformers({
    search: personSearch,
    isTeamMode: false,
  });

  return (
    <Field.Root key='person-select'>
      <Field.Label>Исполнители задачи</Field.Label>
      <Field.RequiredIndicator />
      <Controller
        name='person'
        control={control}
        render={({ field }) => (
          <Combobox.Root
            multiple
            collection={collection}
            value={field.value}
            onValueChange={e => field.onChange(e.value)}
            inputValue={personSearch}
            onInputValueChange={e => setPersonSearch(e.inputValue)}
            onOpenChange={e => {
              if (!e.open) setPersonSearch("");
            }}
            positioning={{ placement: "top", flip: false }}
          >
            <Combobox.Control>
              <Combobox.Input placeholder='Укажите исполнителей задачи' />
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
                        label: "Загрузка...",
                        value: "loading",
                      }}
                    >
                      {collection.items.length > 0
                        ? "Обновление..."
                        : "Загрузка..."}
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
