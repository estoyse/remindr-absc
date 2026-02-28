import { Button, Stack, Tabs } from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { type TaskFormValues } from "../../types";

import { TaskContextField } from "./fields/task-context-field";
import { RoutineFields } from "./fields/routine-fields";
import { GroupSelect } from "./fields/group-select";
import { PersonSelect } from "./fields/person-select";
import { SubjectSelect } from "./fields/subject-select";
import { TagsSelect } from "./fields/tags-select";
import { DeadlineFields } from "./fields/deadline-fields";
import { FileUploadField } from "./fields/file-upload-field";

export const TaskTabContent = () => {
  const { control, handleSubmit } = useForm<TaskFormValues>({
    defaultValues: {
      taskContext: "",
      attachToGroup: true,
      isRoutine: false,
      routine: {
        name: "",
        period: [],
        description: "",
      },
      person: [],
      group: [],
      subject: [],
      tags: [],
      deadlineDate: "",
      deadlineTime: "",
      files: [],
    },
  });

  const attachToGroup = useWatch({ control, name: "attachToGroup" });
  const isRoutine = useWatch({ control, name: "isRoutine" });
  const taskContext = useWatch({ control, name: "taskContext" }) || "";
  const routineName = useWatch({ control, name: "routine.name" }) || "";

  const onSubmit = (data: TaskFormValues) => {
    const finalData = { ...data };
    if (!finalData.isRoutine) {
      finalData.routine = { name: "", period: [], description: "" };
    }
    console.log("Form Data:", finalData);
  };

  return (
    <Tabs.Content value='task'>
      <Stack gap='4' as='form' onSubmit={handleSubmit(onSubmit)}>
        <TaskContextField
          control={control}
          taskContextLength={taskContext.length}
        />

        <RoutineFields
          control={control}
          isRoutine={isRoutine}
          routineNameLength={routineName.length}
        />

        <Stack gap='4' pt='2'>
          {attachToGroup ? (
            <GroupSelect control={control} />
          ) : (
            <PersonSelect control={control} />
          )}

          <SubjectSelect control={control} />
          <TagsSelect control={control} />
        </Stack>

        <DeadlineFields control={control} />
        <FileUploadField control={control} />

        <Button type='submit'>Create task</Button>
      </Stack>
    </Tabs.Content>
  );
};
