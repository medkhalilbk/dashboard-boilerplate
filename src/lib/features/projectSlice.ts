import { IProject } from '@/types/Project';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IProjectState {
    data: IProject[];
}

const initialState: IProjectState = {
    data: []
} as IProjectState;

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.data = action.payload;
        },
        destroy: state => {
            state.data = initialState.data;
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(project => project.id !== action.payload);
        },
        updateProject: (state, action: PayloadAction<IProject>) => {
            console.log("test from reducer");
            console.log(action.payload);
            state.data = state.data.map(project => project.id === action.payload.id ? action.payload : project);
        },
        addProject: (state, action: PayloadAction<IProject>) => {
            state.data = [...state.data, action.payload];
        }
    }
});

export const { setProjects, destroy, deleteProject, updateProject, addProject } = projectSlice.actions;
export default projectSlice.reducer;
