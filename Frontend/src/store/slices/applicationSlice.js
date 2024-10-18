import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
        message: null,
        myApplications: [],
    },
    reducers: {
        requestForAllApplications(state) {
            state.loading = true;
            state.error = null;
        },
        successForAllApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForAllApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestForMyApplications(state) {
            state.loading = true;
            state.error = null;
        },
        successForMyApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.myApplications = action.payload;
        },
        failureForMyApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestForPostApplications(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successForPostApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
            
        },
        failureForPostApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        requestforDeleteApplication(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        successforDeleteApplication(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        failureforDeleteApplication(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearAllErrors(state) {
            state.error = null;
        },
        resetApplication(state) {
            state.error = null;
            state.loading = false;
            state.message = null;
        },
    },
});

export const fetchEmployerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForAllApplications());
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/application/employer/GetAll`, {
            withCredentials: true,
        });
        dispatch(applicationSlice.actions.successForAllApplications(response.data.allApplication));
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(applicationSlice.actions.failureForAllApplications(errorMessage));
    }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForMyApplications());
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/application/jobSeeker/GetAll`, {
            withCredentials: true,
        });
        dispatch(applicationSlice.actions.successForMyApplications(response.data.allApplication));
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(applicationSlice.actions.failureForMyApplications(errorMessage));
    }
};

export const postApplication = (data, jobId) => async (dispatch) => {
    dispatch(applicationSlice.actions.requestForPostApplications());
    try {
        const response = await axios.post(`http://localhost:4000/api/v1/application/postApplication/${jobId}`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(applicationSlice.actions.successForPostApplications(response.data.message));
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(applicationSlice.actions.failureForPostApplications(errorMessage));
    }
};



export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
};

export const deleteApplication=(id)=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestforDeleteApplication())
    try{
       const response=await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`,{
           withCredentials:true
       })
       dispatch(applicationSlice.actions.successforDeleteApplication(response.data.message))
       dispatch(clearAllApplicationErrors())
    }
    catch(error){
       dispatch(applicationSlice.actions.failureforDeleteApplication())
    }
}

export const resetApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplication());
};

export default applicationSlice.reducer;
