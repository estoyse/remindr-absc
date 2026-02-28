import { Controller, type Control } from "react-hook-form";
import { Field, InputGroup, Span, Textarea } from "@chakra-ui/react";
import { type TaskFormValues } from "../../../types";

interface TaskContextFieldProps {
  control: Control<TaskFormValues>;
  taskContextLength: number;
}

export const TaskContextField = ({
  control,
  taskContextLength,
}: TaskContextFieldProps) => {
  const MAX_CHARACTERS = 100;
  return (
    <Field.Root>
      <Field.Label>Task Context</Field.Label>
      <Field.RequiredIndicator />
      <InputGroup
        endElement={
          <Span color='fg.muted' textStyle='xs'>
            {taskContextLength} / {MAX_CHARACTERS}
          </Span>
        }
      >
        <Controller
          name='taskContext'
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder='Enter your message'
              maxLength={MAX_CHARACTERS}
              onChange={e => {
                field.onChange(e.currentTarget.value.slice(0, MAX_CHARACTERS));
              }}
            />
          )}
        />
      </InputGroup>
    </Field.Root>
  );
};
