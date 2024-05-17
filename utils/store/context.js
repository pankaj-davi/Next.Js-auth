import React, { createContext, useReducer, useEffect } from "react";
import axiosInstance from '../axiosInstance';

export const AppContext = createContext({});

const initialState = {
    Allproducts: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
};

const handleReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_USER_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                Allproducts: action.payload,
            };
        case "FETCH_USER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case "SET_PAGE":
            const skip = (action.payload - 1) * state.itemsPerPage;
            fetchUser(action.dispatch, state.itemsPerPage, skip);
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
};

const fetchUser = async (dispatch, limit, skip) => {
    dispatch({ type: "FETCH_USER_REQUEST" });
    try {
        const response = await axiosInstance.get(`/api/products?limit=${limit}&skip=${skip}`);
        const data = await response.data;
        dispatch({ type: "FETCH_USER_SUCCESS", payload: data[0] });
    } catch (error) {
        dispatch({ type: "FETCH_USER_FAILURE", error: error.message });
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(handleReducer, initialState);

    useEffect(() => {
        const skip = (state.currentPage - 1) * state.itemsPerPage;
        fetchUser(dispatch, state.itemsPerPage, skip);
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
