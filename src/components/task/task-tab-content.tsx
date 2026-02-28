import { useState } from "react";
import { Button, Stack, Tabs } from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { type TaskFormValues, type StoredTask } from "../../types";
import { TaskApi } from "../../api/api";
import { toaster } from "../../components/ui/toaster";

import { TaskContextField } from "./fields/task-context-field";
import { RoutineFields } from "./fields/routine-fields";
import { GroupSelect } from "./fields/group-select";
import { PersonSelect } from "./fields/person-select";
import { SubjectSelect } from "./fields/subject-select";
import { TagsSelect } from "./fields/tags-select";
import { DeadlineFields } from "./fields/deadline-fields";
import { FileUploadField } from "./fields/file-upload-field";

interface TaskTabContentProps {
  onSuccess?: () => void;
}

export const TaskTabContent = ({ onSuccess }: TaskTabContentProps) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<TaskFormValues>({
    defaultValues: {
      taskContext: "",
      attachToGroup: false,
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

  const onSubmit = async (data: TaskFormValues) => {
    const finalData = { ...data };
    if (!finalData.isRoutine) {
      finalData.routine = { name: "", period: [], description: "" };
    }

    setIsSubmitting(true);
    try {
      const result = await TaskApi.submitTask(finalData);
      if (result.success) {
        // Optimistically update the cache for immediate feedback
        queryClient.setQueryData<StoredTask[]>(["tasks"], old => {
          const tasks = old || [];
          return [...tasks, result.task];
        });

        // Also invalidate to be safe and sync with server/storage
        await queryClient.invalidateQueries({ queryKey: ["tasks"] });

        toaster.create({
          title: "Task created",
          description: "Your task has been successfully added to the list.",
          type: "success",
        });
        reset();
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toaster.create({
        title: "Error",
        description: "Failed to create task. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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

        <Button type='submit' loading={isSubmitting} loadingText='Creating...'>
          Create task
        </Button>
      </Stack>
    </Tabs.Content>
  );
};
