import axios from 'axios';
import { Expense, Category, ExpenseFilters, ExpenseStats, CreateExpenseData } from '../types';

const API_BASE = '/api';

// Expenses API
export const expensesApi = {
    getAll: async (filters?: ExpenseFilters): Promise<Expense[]> => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
        }
        const response = await axios.get(`${API_BASE}/expenses?${params}`);
        return response.data;
    },

    getById: async (id: string): Promise<Expense> => {
        const response = await axios.get(`${API_BASE}/expenses/${id}`);
        return response.data;
    },

    create: async (data: CreateExpenseData): Promise<Expense> => {
        const response = await axios.post(`${API_BASE}/expenses`, data);
        return response.data;
    },

    update: async (id: string, data: Partial<CreateExpenseData>): Promise<Expense> => {
        const response = await axios.put(`${API_BASE}/expenses/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE}/expenses/${id}`);
    },

    getStats: async (): Promise<ExpenseStats> => {
        const response = await axios.get(`${API_BASE}/expenses/stats/summary`);
        return response.data;
    },
};

// Categories API
export const categoriesApi = {
    getAll: async (): Promise<Category[]> => {
        const response = await axios.get(`${API_BASE}/categories`);
        return response.data;
    },

    create: async (name: string): Promise<Category> => {
        const response = await axios.post(`${API_BASE}/categories`, { name });
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE}/categories/${id}`);
    },
};
