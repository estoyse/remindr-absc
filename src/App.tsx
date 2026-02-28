import {
  Button,
  createListCollection,
  Dialog,
  Icon,
  Portal,
  Stack,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { LuFolder, LuUser, LuX } from "react-icons/lu";
import { ReminderTabContent } from "./components/task/reminder-tab-content";
import { TaskTabContent } from "./components/task/task-tab-content";
import { type SelectItem } from "./data/types";

function App() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const userCollection = useMemo(() => {
    return createListCollection<SelectItem>({
      items: users.map(user => ({
        label: user.name,
        value: user.id.toString(),
        avatar: `https://i.pravatar.cc/100?u=${user.id}`,
      })),
    });
  }, [users]);

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
                      <LuUser />
                      Create task
                    </Tabs.Trigger>
                    <Tabs.Trigger value='reminder'>
                      <LuFolder />
                      Create reminder
                    </Tabs.Trigger>
                    <Tabs.Indicator />
                  </Tabs.List>

                  <TaskTabContent userCollection={userCollection} />
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

export default App;
