import { type ListCollection } from "@chakra-ui/react";
import { type TaskFormValues as SchemaTaskFormValues } from "@/schemas/task";

export type TaskFormValues = SchemaTaskFormValues;

export interface SelectItem {
  label: string;
  value: string;
  avatar?: string;
  colorPalette?: string;
}

export interface TaskTabContentProps {
  userCollection: ListCollection<SelectItem>;
}

export interface StoredTask extends Omit<TaskFormValues, "files"> {
  id: string;
  createdAt: string;
  files: string[];
}
