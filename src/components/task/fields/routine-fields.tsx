import { Controller, type Control, useWatch } from "react-hook-form";
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
import { Tooltip } from "@/components/ui/tooltip";

interface RoutineFieldsProps {
  control: Control<TaskFormValues>;
}

export const RoutineFields = ({ control }: RoutineFieldsProps) => {
  const isRoutine = useWatch({ control, name: "isRoutine" });
  const routineName = useWatch({ control, name: "routine.name" }) || "";
  const routineNameLength = routineName.length;
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
              <Switch.Label>Назначить на команду</Switch.Label>
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
                <Checkbox.Label>Рутинная задача</Checkbox.Label>
              </Checkbox.Root>
            )}
          />
          <Tooltip
            content='Рутинная задача будет создаваться автоматически в соответствии с указанным периодом'
            contentProps={{ fontSize: "md" }}
          >
            <Icon as={LuInfo} size='md' />
          </Tooltip>
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
              <Field.Label>Название рутинной задачи</Field.Label>
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
                      placeholder='Укажите название рутинной задачи'
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
              <Field.Label>Периодичность</Field.Label>
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
                        <Select.ValueText placeholder='Выберите периодичность' />
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
              <Field.Label>Описание</Field.Label>
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
                    placeholder='Описание рутинной задачи'
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
