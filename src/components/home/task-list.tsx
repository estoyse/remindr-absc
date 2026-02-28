import {
  Card,
  For,
  Stack,
  Text,
  Badge,
  HStack,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { TaskApi } from "../../api/api";
import { LuCalendar, LuTag, LuFile, LuClock } from "react-icons/lu";

export const TaskList = () => {
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => TaskApi.getTasks(),
  });

  const { data: allPerformers } = useQuery({
    queryKey: ["allPerformers"],
    queryFn: () => TaskApi.getAllPerformers(),
  });

  const getPerformer = (id: string) => allPerformers?.find(p => p.id === id);

  if (tasksLoading) return <Text>Loading tasks...</Text>;
  if (!tasks || tasks.length === 0)
    return <Text color='fg.muted'>No tasks created yet.</Text>;

  return (
    <Stack gap='6' w='full'>
      <For each={tasks}>
        {task => (
          <Card.Root key={task.id} variant='outline' size='md'>
            <Card.Body p='5'>
              <Stack gap='4'>
                <HStack justify='space-between' align='flex-start'>
                  <Text fontWeight='bold' fontSize='xl' lineHeight='tight'>
                    {task.taskContext}
                  </Text>
                  {task.isRoutine && (
                    <Badge colorPalette='blue' variant='surface' size='md'>
                      Routine: {task.routine.name} (
                      {task.routine.period.join(", ")})
                    </Badge>
                  )}
                </HStack>

                <HStack gap='5' flexWrap='wrap'>
                  {task.deadlineDate && (
                    <HStack gap='2' color='fg.muted' fontSize='sm'>
                      <Icon as={LuCalendar} size='sm' />
                      <Text>
                        {task.deadlineDate} {task.deadlineTime}
                      </Text>
                    </HStack>
                  )}

                  {task.tags.length > 0 && (
                    <HStack gap='2' flexWrap='wrap'>
                      <Icon as={LuTag} color='fg.muted' size='sm' />
                      <For each={task.tags}>
                        {tag => (
                          <Badge key={tag} size='sm' variant='outline'>
                            {tag}
                          </Badge>
                        )}
                      </For>
                    </HStack>
                  )}

                  {task.files.length > 0 && (
                    <HStack gap='2' color='fg.muted' fontSize='sm'>
                      <Icon as={LuFile} size='sm' />
                      <Text>{task.files.length} file(s)</Text>
                    </HStack>
                  )}
                </HStack>

                <HStack gap='3' pt='2' justify='space-between' align='flex-end'>
                  <HStack gap='3'>
                    {task.person.length > 0 && (
                      <HStack gap='2'>
                        <Text
                          fontSize='sm'
                          fontWeight='medium'
                          color='fg.muted'
                        >
                          Assigned to:
                        </Text>
                        <HStack gap='-1'>
                          <For each={task.person}>
                            {id => {
                              const p = getPerformer(id);
                              return (
                                <Avatar.Root
                                  key={id}
                                  size='sm'
                                  shape='rounded'
                                  border='2px solid'
                                  borderColor='bg.panel'
                                >
                                  <Avatar.Image src={p?.avatar} alt={p?.name} />
                                  <Avatar.Fallback name={p?.name || id} />
                                </Avatar.Root>
                              );
                            }}
                          </For>
                        </HStack>
                      </HStack>
                    )}
                    {task.group.length > 0 && (
                      <HStack gap='2'>
                        <Text
                          fontSize='sm'
                          fontWeight='medium'
                          color='fg.muted'
                        >
                          Teams:
                        </Text>
                        <For each={task.group}>
                          {id => {
                            const p = getPerformer(id);
                            return (
                              <Badge
                                key={id}
                                size='md'
                                colorPalette='green'
                                variant='solid'
                              >
                                {p?.name || id}
                              </Badge>
                            );
                          }}
                        </For>
                      </HStack>
                    )}
                  </HStack>
                  <HStack
                    gap='1'
                    color='fg.subtle'
                    fontSize='xs'
                    fontStyle='italic'
                  >
                    <Icon as={LuClock} size='xs' />
                    <Text>
                      {new Date(task.createdAt).toLocaleString([], {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Card.Body>
          </Card.Root>
        )}
      </For>
    </Stack>
  );
};
