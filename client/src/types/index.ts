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
    minAmount?: string;
    maxAmount?: string;
    search?: string;
}

export interface ExpenseStats {
    total: number;
    count: number;
    average: number;
    categoryBreakdown: Record<string, number>;
}

export interface CreateExpenseData {
    title: string;
    amount: number;
    category_id: string;
    date: string;
    description?: string;
}
