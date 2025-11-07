import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { deleteProject } from '../store/slices/projectsSlice';
import { Project } from '../store/types';

type UseProjectActions = {
    handleDelete: (id: string) => Promise<void>;
    openEdit: (project: Project) => void;
};

export const useProjectActions = (
    openEditCallback: (project: any) => void
): UseProjectActions => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await dispatch(deleteProject(id) as any).unwrap();
        } catch (err: any) {
            alert(err?.message || 'Delete failed');
        }
    };

    const openEdit = (project: any) => {
        openEditCallback(project);
    };

    return {
        handleDelete,
        openEdit,
    };
};