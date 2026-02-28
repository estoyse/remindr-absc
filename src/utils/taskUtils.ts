import { periodCollection, tagsCollection } from "../data/mock-data";
export const getTag = (value: string) => {
  return tagsCollection.items.find(item => item.value === value);
};

export const getPeriodLabel = (value: string) => {
  return (
    periodCollection.items.find(item => item.value === value)?.label || value
  );
};
