import { Button, Dialog, Icon, Portal, Stack, Tabs } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import { MdTaskAlt } from "react-icons/md";
import { TaskTabContent } from "../task/task-tab-content";
import { ReminderTabContent } from "../task/reminder-tab-content";

export default function Home() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant='outline'>Open</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger>
              <Icon as={LuX} size='lg' />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Create task</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb='4'>
              <Stack gap='4'>
                <Tabs.Root defaultValue='task' variant='plain' fitted>
                  <Tabs.List bg='bg.muted'>
                    <Tabs.Trigger value='task'>
                      <MdTaskAlt />
                      Create task
                    </Tabs.Trigger>
                    <Tabs.Trigger value='reminder'>
                      <FaTasks />
                      Create reminder
                    </Tabs.Trigger>
                    <Tabs.Indicator />
                  </Tabs.List>

                  <TaskTabContent />
                  <ReminderTabContent />
                </Tabs.Root>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
