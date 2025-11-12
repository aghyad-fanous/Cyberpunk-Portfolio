// src/hooks/useExperienceActions.ts

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Experience } from "../store/types";
import { deleteExperience } from "../store/slices/experienceSlice";

export const useExperienceActions = (
  openEdit: (experience: Experience) => void
) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      dispatch(deleteExperience(id) as any);
    }
  };

  return { handleDelete, openEdit };
};