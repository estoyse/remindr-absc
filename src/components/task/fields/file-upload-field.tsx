import { Controller, type Control, useFormState } from "react-hook-form";
import { Button, Field, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import type { TaskFormValues } from "@/schemas/task";

interface FileUploadFieldProps {
  control: Control<TaskFormValues>;
}

export const FileUploadField = ({ control }: FileUploadFieldProps) => {
  const { errors } = useFormState({ control, name: "files" });

  return (
    <Field.Root invalid={!!errors.files}>
      <Field.Label>Файлы</Field.Label>
      <Field.RequiredIndicator />
      <Controller
        name='files'
        control={control}
        render={({ field }) => (
          <FileUpload.Root
            accept={["image/png"]}
            onFileChange={e => field.onChange(e.acceptedFiles)}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
              <Button variant='outline' w='full' colorPalette={errors.files ? "red" : undefined}>
                <HiUpload /> Прикрепите файлы
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        )}
      />
      <Field.ErrorText>{errors.files?.message}</Field.ErrorText>
    </Field.Root>
  );
};
