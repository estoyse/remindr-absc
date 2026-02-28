import { useState, useMemo } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Collapsible,
  Combobox,
  Field,
  FileUpload,
  Flex,
  Icon,
  Input,
  InputGroup,
  Portal,
  Select,
  Span,
  Stack,
  Switch,
  Tabs,
  Textarea,
  type ListCollection,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { LuInfo } from "react-icons/lu";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  frameworks,
  tagsCollection,
  groupCollection,
} from "../../data/mock-data";
import {
  MultiSelectValue,
  ComboboxMultiSelectValue,
} from "./multi-select-value";
import { type SelectItem } from "../../data/types";

interface TaskTabContentProps {
  userCollection: ListCollection<SelectItem>;
}

interface TaskFormValues {
  taskContext: string;
  attachToGroup: boolean;
  isRoutine: boolean;
  routineName: string;
  period: string[];
  routineDescription: string;
  person: string[];
  group: string[];
  subject: string[];
  tags: string[];
  deadlineDate: string;
  deadlineTime: string;
  files: File[];
}

export const TaskTabContent = ({ userCollection }: TaskTabContentProps) => {
  const MAX_CHARACTERS = 100;

  const { control, handleSubmit } = useForm<TaskFormValues>({
    defaultValues: {
      taskContext: "",
      attachToGroup: true,
      isRoutine: false,
      routineName: "",
      period: [],
      routineDescription: "",
      person: [],
      group: [],
      subject: [],
      tags: [],
      deadlineDate: "",
      deadlineTime: "",
    },
  });

  const [personSearch, setPersonSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");

  const filteredUserItems = useMemo(() => {
    if (!personSearch) return userCollection.items;
    return userCollection.items.filter(item =>
      item.label.toLowerCase().includes(personSearch.toLowerCase())
    );
  }, [userCollection.items, personSearch]);

  const filteredGroupItems = useMemo(() => {
    if (!groupSearch) return groupCollection.items;
    return groupCollection.items.filter(item =>
      item.label.toLowerCase().includes(groupSearch.toLowerCase())
    );
  }, [groupSearch]);

  const attachToGroup = useWatch({ control, name: "attachToGroup" });
  const isRoutine = useWatch({ control, name: "isRoutine" });
  const taskContext = useWatch({ control, name: "taskContext" }) || "";
  const routineName = useWatch({ control, name: "routineName" }) || "";

  const onSubmit = (data: TaskFormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <Tabs.Content value='task'>
      <Stack gap='4' as='form' onSubmit={handleSubmit(onSubmit)}>
        <Field.Root>
          <Field.Label>Task Context</Field.Label>
          <Field.RequiredIndicator />
          <InputGroup
            endElement={
              <Span color='fg.muted' textStyle='xs'>
                {taskContext.length} / {MAX_CHARACTERS}
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
                    field.onChange(
                      e.currentTarget.value.slice(0, MAX_CHARACTERS)
                    );
                  }}
                />
              )}
            />
          </InputGroup>
        </Field.Root>

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
                      {routineName.length} / {MAX_CHARACTERS}
                    </Span>
                  }
                >
                  <Controller
                    name='routineName'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
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
                  name='period'
                  control={control}
                  render={({ field }) => (
                    <Select.Root
                      collection={frameworks}
                      value={field.value}
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
                            {frameworks.items.map(framework => (
                              <Select.Item
                                item={framework}
                                key={framework.value}
                              >
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
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Field.RequiredIndicator />
                <Controller
                  name='routineDescription'
                  control={control}
                  render={({ field }) => <Textarea {...field} />}
                />
              </Field.Root>
            </Stack>
          </Collapsible.Content>
        </Collapsible.Root>

        <Stack gap='4' pt='2'>
          {attachToGroup ? (
            <Field.Root key='group-select'>
              <Field.Label>Group</Field.Label>
              <Field.RequiredIndicator />
              <Controller
                name='group'
                control={control}
                render={({ field }) => (
                  <Combobox.Root
                    multiple
                    collection={groupCollection}
                    value={field.value}
                    onValueChange={e => field.onChange(e.value)}
                    inputValue={groupSearch}
                    onInputValueChange={e => setGroupSearch(e.inputValue)}
                    onOpenChange={e => {
                      if (!e.open) setGroupSearch("");
                    }}
                  >
                    <Combobox.Control>
                      <Combobox.Input placeholder='Select group' />
                      <Combobox.Trigger>
                        <ComboboxMultiSelectValue showAvatar={false} />
                      </Combobox.Trigger>
                    </Combobox.Control>
                    <Portal>
                      <Combobox.Positioner>
                        <Combobox.Content>
                          {filteredGroupItems.map((item: SelectItem) => (
                            <Combobox.Item
                              item={item}
                              key={item.value}
                              justifyContent='flex-start'
                            >
                              {item.label}
                              <Combobox.ItemIndicator />
                            </Combobox.Item>
                          ))}
                        </Combobox.Content>
                      </Combobox.Positioner>
                    </Portal>
                  </Combobox.Root>
                )}
              />
            </Field.Root>
          ) : (
            <Field.Root key='person-select'>
              <Field.Label>Person</Field.Label>
              <Field.RequiredIndicator />
              <Controller
                name='person'
                control={control}
                render={({ field }) => (
                  <Combobox.Root
                    multiple
                    collection={userCollection}
                    value={field.value}
                    onValueChange={e => field.onChange(e.value)}
                    inputValue={personSearch}
                    onInputValueChange={e => setPersonSearch(e.inputValue)}
                    onOpenChange={e => {
                      if (!e.open) setPersonSearch("");
                    }}
                  >
                    <Combobox.Control>
                      <Combobox.Input placeholder='Select person' />
                      <Combobox.Trigger>
                        <ComboboxMultiSelectValue showAvatar={true} />
                      </Combobox.Trigger>
                    </Combobox.Control>
                    <Portal>
                      <Combobox.Positioner>
                        <Combobox.Content mt='2'>
                          {filteredUserItems.map((item: SelectItem) => (
                            <Combobox.Item
                              item={item}
                              key={item.value}
                              justifyContent='flex-start'
                            >
                              {item.avatar && (
                                <Avatar.Root shape='rounded' size='2xs'>
                                  <Avatar.Image
                                    src={item.avatar}
                                    alt={item.label}
                                  />
                                  <Avatar.Fallback name={item.label} />
                                </Avatar.Root>
                              )}
                              {item.label}
                              <Combobox.ItemIndicator />
                            </Combobox.Item>
                          ))}
                        </Combobox.Content>
                      </Combobox.Positioner>
                    </Portal>
                  </Combobox.Root>
                )}
              />
            </Field.Root>
          )}

          <Field.Root>
            <Field.Label>Subject</Field.Label>
            <Field.RequiredIndicator />
            <Controller
              name='subject'
              control={control}
              render={({ field }) => (
                <Select.Root
                  multiple
                  collection={frameworks}
                  value={field.value}
                  onValueChange={e => field.onChange(e.value)}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder='Select subject' />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map(framework => (
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
        </Stack>

        <Field.Root>
          <Field.Label>Deadline</Field.Label>
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

        <Field.Root>
          <Field.Label>File</Field.Label>
          <Field.RequiredIndicator />
          <Controller
            name='files'
            control={control}
            render={({ field }) => (
              <FileUpload.Root
                accept={["image/png"]}
                onFileChange={e => field.onChange(e.acceptedFiles)}
              >
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant='outline' w='full'>
                    <HiUpload /> Upload file
                  </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>
            )}
          />
        </Field.Root>

        <Button type='submit'>Create task</Button>
      </Stack>
    </Tabs.Content>
  );
};
