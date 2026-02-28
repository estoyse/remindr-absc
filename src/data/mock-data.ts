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

export const subjects = createListCollection<SelectItem>({
  items: [
    { label: "Совещание", value: "meeting" },
    { label: "Разработка", value: "development" },
    { label: "Исследование", value: "research" },
    { label: "Планирование", value: "planning" },
    { label: "Администрирование", value: "admin" },
    { label: "Отчетность", value: "reporting" },
    { label: "Поддержка", value: "support" },
    { label: "Срочно", value: "urgent" },
  ],
});

export const tagsCollection = createListCollection<SelectItem>({
  items: [
    { label: "Ошибка", value: "bug", colorPalette: "red" },
    { label: "Новая функция", value: "feature", colorPalette: "green" },
    { label: "Критично", value: "critical", colorPalette: "orange" },
    { label: "Рефакторинг", value: "refactor", colorPalette: "blue" },
    { label: "Интерфейс", value: "ui", colorPalette: "pink" },
    { label: "Бэкенд", value: "backend", colorPalette: "purple" },
    { label: "Документация", value: "docs", colorPalette: "teal" },
  ],
});

export const groupCollection = createListCollection<SelectItem>({
  items: [
    { label: "Разработка", value: "eng", colorPalette: "blue" },
    { label: "Дизайн", value: "design", colorPalette: "pink" },
    { label: "Продукт", value: "product", colorPalette: "purple" },
    { label: "Маркетинг", value: "marketing", colorPalette: "orange" },
    { label: "HR", value: "hr", colorPalette: "red" },
  ],
});

export const periodCollection = createListCollection<SelectItem>({
  items: [
    { label: "Почасово", value: "hourly" },
    { label: "Ежедневно", value: "daily" },
    { label: "Еженедельно", value: "weekly" },
    { label: "Ежемесячно", value: "monthly" },
    { label: "Ежегодно", value: "annually" },
  ],
});
