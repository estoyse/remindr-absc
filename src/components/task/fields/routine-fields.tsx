import { Controller, type Control } from "react-hook-form";
import {
  Checkbox,
  Collapsible,
  Field,
  Flex,
  Icon,
  Input,
  InputGroup,
  Portal,
  Select,
  Span,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { LuInfo } from "react-icons/lu";
import { periodCollection } from "../../../data/mock-data";
import { type TaskFormValues } from "../../../types";

interface RoutineFieldsProps {
  control: Control<TaskFormValues>;
  isRoutine: boolean;
  routineNameLength: number;
}

export const RoutineFields = ({
  control,
  isRoutine,
  routineNameLength,
}: RoutineFieldsProps) => {
  const MAX_CHARACTERS = 100;
  return (
    <>
      <Flex direction='row' justify='space-between'>
        <Controller
          name='attachToGroup'
          control={control}
          render={({ field }) => (
            <Switch.Root
              checked={field.value}
              onCheckedChange={e => field.onChange(e.checked)}
            >
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label>Attach to the group</Switch.Label>
            </Switch.Root>
          )}
        />
        <Stack direction='row'>
          <Controller
            name='isRoutine'
            control={control}
            render={({ field }) => (
              <Checkbox.Root
                checked={field.value}
                onCheckedChange={e => field.onChange(!!e.checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Routine Task</Checkbox.Label>
              </Checkbox.Root>
            )}
          />
          <Icon as={LuInfo} size='md' />
        </Stack>
      </Flex>

      <Collapsible.Root open={isRoutine}>
        <Collapsible.Content>
          <Stack
            gap='4'
            pt='2'
            border='2px dashed violet'
            padding='2'
            rounded='md'
          >
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Field.RequiredIndicator />
              <InputGroup
                endElement={
                  <Span color='fg.muted' textStyle='xs'>
                    {routineNameLength} / {MAX_CHARACTERS}
                  </Span>
                }
              >
                <Controller
                  name='routine.name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      name={field.name}
                      value={field.value as string}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder='Enter your message'
                      maxLength={MAX_CHARACTERS}
                      onChange={e => {
                        field.onChange(
                          e.currentTarget.value.slice(0, MAX_CHARACTERS)
                        );
                      }}
                    />
                  )}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root>
              <Field.Label>Period</Field.Label>
              <Field.RequiredIndicator />
              <Controller
                name='routine.period'
                control={control}
                render={({ field }) => (
                  <Select.Root
                    collection={periodCollection}
                    value={field.value as string[]}
                    onValueChange={e => field.onChange(e.value)}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder='Select period' />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {periodCollection.items.map(p => (
                            <Select.Item item={p} key={p.value}>
                              {p.label}
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
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Field.RequiredIndicator />
              <Controller
                name='routine.description'
                control={control}
                render={({ field }) => (
                  <Textarea
                    name={field.name}
                    value={field.value as string}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
            </Field.Root>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
};
