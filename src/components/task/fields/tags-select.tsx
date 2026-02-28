import { Controller, type Control, useFormState } from "react-hook-form";
import { Field, Portal, Select } from "@chakra-ui/react";
import { tagsCollection } from "../../../data/mock-data";
import { MultiSelectValue } from "../../ui/multi-select-value";
import type { TaskFormValues } from "@/schemas/task";

interface TagsSelectProps {
  control: Control<TaskFormValues>;
}

export const TagsSelect = ({ control }: TagsSelectProps) => {
  const { errors } = useFormState({ control, name: "tags" });

  return (
    <Field.Root invalid={!!errors.tags}>
      <Field.Label>Теги</Field.Label>
      <Field.RequiredIndicator />
      <Controller
        name='tags'
        control={control}
        render={({ field }) => (
          <Select.Root
            multiple
            collection={tagsCollection}
            value={field.value}
            onValueChange={e => field.onChange(e.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <MultiSelectValue placeholder='Укажите соответствующие теги' />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {tagsCollection.items.map(tag => (
                    <Select.Item item={tag} key={tag.value}>
                      {tag.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors.tags?.message}</Field.ErrorText>
    </Field.Root>
  );
};
