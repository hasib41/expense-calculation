export interface Category {
    id: string;
    name: string;
    created_at: string;
}

export interface Expense {
    id: string;
    title: string;
    amount: number;
    category_id: string;
    date: string;
    description?: string;
    created_at: string;
    category?: Category;
}

export interface ExpenseFilters {
    startDate?: string;
    endDate?: string;
    category?: string;
    minAmount?: number;
    maxAmount?: number;
    search?: string;
}

export interface CreateExpenseDto {
    title: string;
    amount: number;
    category_id: string;
    date: string;
    description?: string;
}

export interface UpdateExpenseDto {
    title?: string;
    amount?: number;
    category_id?: string;
    date?: string;
    description?: string;
}

export interface CreateCategoryDto {
    name: string;
}
