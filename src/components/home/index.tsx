import { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  Heading,
  Icon,
  HStack,
  Portal,
  Stack,
  Tabs,
} from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { LuX, LuPlus } from "react-icons/lu";
import { MdTaskAlt } from "react-icons/md";
import { TaskList } from "./task-list";

import TaskTabContent from "../task/task-tab-content";
import ReminderTabContent from "../task/reminder-tab-content";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Container maxW='md' py='8'>
      <Stack gap='8'>
        <HStack justify='space-between' align='center'>
          <Heading size='2xl'>Мои задачи</Heading>
          <Dialog.Root open={open} onOpenChange={e => setOpen(e.open)}>
            <Dialog.Trigger asChild>
              <Button rounded='full' size='lg'>
                <Icon as={LuPlus} />
                Создать задачу
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.CloseTrigger>
                    <Icon as={LuX} size='lg' />
                  </Dialog.CloseTrigger>
                  <Dialog.Header>
                    <Dialog.Title>Создание задачи</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb='4'>
                    <Stack gap='4'>
                      <Tabs.Root defaultValue='task' variant='plain' fitted>
                        <Tabs.List bg='bg.muted'>
                          <Tabs.Trigger value='task'>
                            <MdTaskAlt />
                            Создание задачи
                          </Tabs.Trigger>
                          <Tabs.Trigger value='reminder'>
                            <FaTasks />
                            Создание напоминания
                          </Tabs.Trigger>
                          <Tabs.Indicator />
                        </Tabs.List>

                        <TaskTabContent onSuccess={() => setOpen(false)} />
                        <ReminderTabContent />
                      </Tabs.Root>
                    </Stack>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </HStack>

        <TaskList />
      </Stack>
    </Container>
  );
}
