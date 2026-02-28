import {
  Avatar,
  Button,
  Checkbox,
  Collapsible,
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
import { useState } from "react";
import { HiUpload } from "react-icons/hi";
import { LuInfo } from "react-icons/lu";
import {
  frameworks,
  tagsCollection,
  groupCollection,
} from "../../data/mock-data";
import { MultiSelectValue } from "./multi-select-value";
import { type SelectItem } from "../../data/types";

interface TaskTabContentProps {
  userCollection: ListCollection<SelectItem>;
}

export const TaskTabContent = ({ userCollection }: TaskTabContentProps) => {
  const [checked, setChecked] = useState(true);
  const [isRoutine, setIsRoutine] = useState(false);
  const [taskContext, setTaskContext] = useState("");
  const [taskName, setTaskName] = useState("");
  const MAX_CHARACTERS = 100;

  return (
    <Tabs.Content value='task'>
      <Stack gap='4'>
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
            <Textarea
              placeholder='Enter your message'
              value={taskContext}
              maxLength={MAX_CHARACTERS}
              onChange={e => {
                setTaskContext(e.currentTarget.value.slice(0, MAX_CHARACTERS));
              }}
            />
          </InputGroup>
        </Field.Root>
        <Flex direction='row' justify='space-between'>
          <Switch.Root
            checked={checked}
            onCheckedChange={e => setChecked(e.checked)}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>Attach to the group</Switch.Label>
          </Switch.Root>
          <Stack direction='row'>
            <Checkbox.Root
              checked={isRoutine}
              onCheckedChange={e => setIsRoutine(!!e.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Routine Task</Checkbox.Label>
            </Checkbox.Root>
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
                      {taskName.length} / {MAX_CHARACTERS}
                    </Span>
                  }
                >
                  <Input
                    placeholder='Enter your message'
                    value={taskName}
                    maxLength={MAX_CHARACTERS}
                    onChange={e => {
                      setTaskName(
                        e.currentTarget.value.slice(0, MAX_CHARACTERS)
                      );
                    }}
                  />
                </InputGroup>
              </Field.Root>
              <Field.Root>
                <Field.Label>Period</Field.Label>
                <Field.RequiredIndicator />
                <Select.Root collection={frameworks}>
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
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Field.RequiredIndicator />
                <Textarea />
              </Field.Root>
            </Stack>
          </Collapsible.Content>
        </Collapsible.Root>

        <Stack gap='4' pt='2'>
          {checked ? (
            <Field.Root key='group-select'>
              <Field.Label>Group</Field.Label>
              <Field.RequiredIndicator />
              <Select.Root multiple collection={groupCollection}>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <MultiSelectValue
                      placeholder='Select group'
                      showAvatar={false}
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {groupCollection.items.map((item: SelectItem) => (
                        <Select.Item
                          item={item}
                          key={item.value}
                          justifyContent='flex-start'
                        >
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field.Root>
          ) : (
            <Field.Root key='person-select'>
              <Field.Label>Person</Field.Label>
              <Field.RequiredIndicator />
              <Select.Root multiple collection={userCollection}>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <MultiSelectValue
                      placeholder='Select person'
                      showAvatar={true}
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {userCollection.items.map((item: SelectItem) => (
                        <Select.Item
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
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field.Root>
          )}
          <Field.Root>
            <Field.Label>Subject</Field.Label>
            <Field.RequiredIndicator />
            <Select.Root multiple collection={frameworks}>
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
          </Field.Root>
          <Field.Root>
            <Field.Label>Tags</Field.Label>
            <Field.RequiredIndicator />
            <Select.Root multiple collection={tagsCollection}>
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
          </Field.Root>
        </Stack>

        <Field.Root>
          <Field.Label>Deadline</Field.Label>
          <Field.RequiredIndicator />
          <Stack direction='row' w='full'>
            <Input type='date' />
            <Input type='time' />
          </Stack>
        </Field.Root>
        <Field.Root>
          <Field.Label>File</Field.Label>
          <Field.RequiredIndicator />
          <FileUpload.Root accept={["image/png"]}>
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant='outline' w='full'>
                <HiUpload /> Upload file
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        </Field.Root>
        <Button>Create task</Button>
      </Stack>
    </Tabs.Content>
  );
};
