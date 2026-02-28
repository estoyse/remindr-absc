import { Controller, type Control } from "react-hook-form";
import { Field, Portal, Select } from "@chakra-ui/react";
import { tagsCollection } from "../../../data/mock-data";
import { MultiSelectValue } from "../../ui/multi-select-value";
import { type TaskFormValues } from "../../../types";

interface TagsSelectProps {
  control: Control<TaskFormValues>;
}

export const TagsSelect = ({ control }: TagsSelectProps) => {
  return (
    <Field.Root>
      <Field.Label>Tags</Field.Label>
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
                <MultiSelectValue placeholder='Select tags' />
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
    </Field.Root>
  );
};
