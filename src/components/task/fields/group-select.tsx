import { useState } from "react";
import { Avatar, Combobox, Field, Portal } from "@chakra-ui/react";
import { Controller, useFormState, type Control } from "react-hook-form";
import { ComboboxMultiSelectValue } from "../../ui/multi-select-value";
import { usePerformers } from "../../../hooks/use-performers";
import type { TaskFormValues } from "@/schemas/task";
import type { SelectItem } from "@/types";

interface GroupSelectProps {
  control: Control<TaskFormValues>;
}

export const GroupSelect = ({ control }: GroupSelectProps) => {
  const [groupSearch, setGroupSearch] = useState("");
  const { collection, isLoading } = usePerformers({
    search: groupSearch,
    isTeamMode: true,
  });
  const { errors } = useFormState({ control, name: "group" });

  return (
    <Field.Root key='group-select' invalid={!!errors.group}>
      <Field.Label>Команда</Field.Label>
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
              <Combobox.Input placeholder='Выберите команду' />
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
      <Field.ErrorText>{errors.group?.message}</Field.ErrorText>
    </Field.Root>
  );
};
