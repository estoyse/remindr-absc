import { Controller, type Control } from "react-hook-form";
import { Field, Input, Stack } from "@chakra-ui/react";
import { type TaskFormValues } from "../../../types";

interface DeadlineFieldsProps {
  control: Control<TaskFormValues>;
}

export const DeadlineFields = ({ control }: DeadlineFieldsProps) => {
  return (
    <Field.Root>
      <Field.Label>Срок выполнения</Field.Label>
      <Field.RequiredIndicator />
      <Stack direction='row' w='full'>
        <Controller
          name='deadlineDate'
          control={control}
          render={({ field }) => <Input type='date' {...field} />}
        />
        <Controller
          name='deadlineTime'
          control={control}
          render={({ field }) => <Input type='time' {...field} />}
        />
      </Stack>
    </Field.Root>
  );
};
