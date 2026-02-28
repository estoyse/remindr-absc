import { createListCollection } from "@chakra-ui/react";
import { type SelectItem } from "../types";

export const frameworks = createListCollection<SelectItem>({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export const tagsCollection = createListCollection<SelectItem>({
  items: [
    { label: "Bug", value: "bug", colorPalette: "red" },
    { label: "Feature", value: "feature", colorPalette: "green" },
    { label: "Critical", value: "critical", colorPalette: "orange" },
    { label: "Refactor", value: "refactor", colorPalette: "blue" },
    { label: "UI", value: "ui", colorPalette: "pink" },
    { label: "Backend", value: "backend", colorPalette: "purple" },
    { label: "Documentation", value: "docs", colorPalette: "teal" },
  ],
});

export const groupCollection = createListCollection<SelectItem>({
  items: [
    { label: "Engineering", value: "eng", colorPalette: "blue" },
    { label: "Design", value: "design", colorPalette: "pink" },
    { label: "Product", value: "product", colorPalette: "purple" },
    { label: "Marketing", value: "marketing", colorPalette: "orange" },
    { label: "HR", value: "hr", colorPalette: "red" },
  ],
});
