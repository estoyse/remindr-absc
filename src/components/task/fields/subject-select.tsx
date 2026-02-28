import { Controller, type Control } from "react-hook-form";
import { Field, Portal, Select } from "@chakra-ui/react";
import { subjects } from "../../../data/mock-data";
import { type TaskFormValues } from "../../../types";

interface SubjectSelectProps {
  control: Control<TaskFormValues>;
}

export const SubjectSelect = ({ control }: SubjectSelectProps) => {
  return (
    <Field.Root>
      <Field.Label>Указать тему</Field.Label>
      <Field.RequiredIndicator />
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Select.Root
            multiple
            collection={subjects}
            value={field.value}
            onValueChange={(e) => field.onChange(e.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Выберите тему" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {subjects.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
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
