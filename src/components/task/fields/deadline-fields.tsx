import { Controller, type Control, useFormState } from "react-hook-form";
import { Field, Input, Stack } from "@chakra-ui/react";
import type { TaskFormValues } from "@/schemas/task";

interface DeadlineFieldsProps {
  control: Control<TaskFormValues>;
}

export const DeadlineFields = ({ control }: DeadlineFieldsProps) => {
  const { errors } = useFormState({
    control,
    name: ["deadlineDate", "deadlineTime"],
  });

  const isInvalid = !!errors.deadlineDate || !!errors.deadlineTime;

  return (
    <Field.Root invalid={isInvalid}>
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
      <Field.ErrorText>
        {errors.deadlineDate?.message || errors.deadlineTime?.message}
      </Field.ErrorText>
    </Field.Root>
  );
};
