import { Controller, type Control } from "react-hook-form";
import { Button, Field, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { type TaskFormValues } from "../../../types";

interface FileUploadFieldProps {
  control: Control<TaskFormValues>;
}

export const FileUploadField = ({ control }: FileUploadFieldProps) => {
  return (
    <Field.Root>
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
              <Button variant='outline' w='full'>
                <HiUpload /> Прикрепите файлы
              </Button>
            </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        )}
      />
    </Field.Root>
  );
};
