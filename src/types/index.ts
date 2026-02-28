import { type ListCollection } from "@chakra-ui/react";

export interface SelectItem {
  label: string;
  value: string;
  avatar?: string;
  colorPalette?: string;
}

export interface TaskTabContentProps {
  userCollection: ListCollection<SelectItem>;
}

export interface TaskFormValues {
  taskContext: string;
  attachToGroup: boolean;
  isRoutine: boolean;
  routine: {
    name: string;
    period: string[];
    description: string;
  };
  person: string[];
  group: string[];
  subject: string[];
  tags: string[];
  deadlineDate: string;
  deadlineTime: string;
  files: File[];
}
