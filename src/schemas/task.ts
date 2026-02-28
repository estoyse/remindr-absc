import { z } from "zod";

export const taskFormSchema = z
  .object({
    taskContext: z.string().min(1, "Контекст задачи обязателен"),
    isRoutine: z.boolean(),
    routine: z.object({
      name: z.string(),
      period: z.string(),
      description: z.string(),
    }),
    attachToGroup: z.boolean(),
    person: z.array(z.string()),
    group: z.array(z.string()),
    subject: z.array(z.string()).min(1, "Выберите хотя бы одну тему"),
    tags: z.array(z.string()).min(1, "Выберите хотя бы один тег"),
    deadlineDate: z.string().min(1, "Выберите дату"),
    deadlineTime: z.string().min(1, "Выберите время"),
    files: z.array(z.instanceof(File)).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isRoutine) {
      if (data.routine.name.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Введите название рутинной задачи",
          path: ["routine", "name"],
        });
      }
      if (data.routine.period.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Выберите периодичность",
          path: ["routine", "period"],
        });
      }
      if (data.routine.description.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Введите описание",
          path: ["routine", "description"],
        });
      }
    }

    if (data.attachToGroup) {
      if (data.group.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Выберите хотя бы одну команду",
          path: ["group"],
        });
      }
    } else {
      if (data.person.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Выберите хотя бы одного исполнителя",
          path: ["person"],
        });
      }
    }
  });

export type TaskFormValues = z.infer<typeof taskFormSchema>;
