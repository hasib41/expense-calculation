import { useState, useEffect, useCallback } from 'react';
import { Expense, Category, ExpenseFilters, ExpenseStats } from './types';
import { expensesApi, categoriesApi } from './api/expenses';
import Dashboard from './components/Dashboard';
import FilterPanel from './components/FilterPanel';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import CategoryManager from './components/CategoryManager';

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stats, setStats] = useState<ExpenseStats | null>(null);
    const [filters, setFilters] = useState<ExpenseFilters>({});
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const loadCategories = useCallback(async () => {
        try {
            const data = await categoriesApi.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }, []);

    const loadExpenses = useCallback(async () => {
        try {
            setLoading(true);
            const data = await expensesApi.getAll(filters);
            setExpenses(data);
        } catch (error) {
            console.error('Failed to load expenses:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const loadStats = useCallback(async () => {
        try {
            const data = await expensesApi.getStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }, []);

    useEffect(() => {
        loadCategories();
        loadStats();
    }, [loadCategories, loadStats]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const handleAddExpense = async (data: Omit<Expense, 'id' | 'created_at' | 'category'>) => {
        try {
            await expensesApi.create(data);
            await loadExpenses();
            await loadStats();
            setShowForm(false);
        } catch (error) {
            console.error('Failed to add expense:', error);
        }
    };

    const handleUpdateExpense = async (id: string, data: Partial<Expense>) => {
        try {
            await expensesApi.update(id, data);
            await loadExpenses();
            await loadStats();
            setEditingExpense(null);
        } catch (error) {
            console.error('Failed to update expense:', error);
        }
    };

    const handleDeleteExpense = async (id: string) => {
        if (!confirm('Are you sure you want to delete this expense?')) return;
        try {
            await expensesApi.delete(id);
            await loadExpenses();
            await loadStats();
        } catch (error) {
            console.error('Failed to delete expense:', error);
        }
    };

    const handleAddCategory = async (name: string) => {
        try {
            await categoriesApi.create(name);
            await loadCategories();
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await categoriesApi.delete(id);
            await loadCategories();
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-base sm:text-xl font-bold text-slate-900 truncate">Expense Tracker</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex items-center gap-3">
                            <button
                                onClick={() => setShowCategories(true)}
                                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Categories
                            </button>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Expense
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="sm:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="sm:hidden py-3 border-t border-slate-200 space-y-2">
                            <button
                                onClick={() => {
                                    setShowCategories(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-left"
                            >
                                Manage Categories
                            </button>
                            <button
                                onClick={() => {
                                    setShowForm(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full px-4 py-3 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Expense
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Dashboard */}
                <Dashboard stats={stats} />

                {/* Filters */}
                <FilterPanel
                    filters={filters}
                    categories={categories}
                    onFilterChange={setFilters}
                />

                {/* Expense List */}
                <ExpenseList
                    expenses={expenses}
                    loading={loading}
                    onEdit={setEditingExpense}
                    onDelete={handleDeleteExpense}
                />
            </main>

            {/* Floating Add Button for Mobile */}
            <button
                onClick={() => setShowForm(true)}
                className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-105 flex items-center justify-center z-20"
                aria-label="Add expense"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* Add/Edit Expense Modal */}
            {(showForm || editingExpense) && (
                <ExpenseForm
                    expense={editingExpense}
                    categories={categories}
                    onSubmit={editingExpense
                        ? (data) => handleUpdateExpense(editingExpense.id, data)
                        : handleAddExpense
                    }
                    onClose={() => {
                        setShowForm(false);
                        setEditingExpense(null);
                    }}
                />
            )}

            {/* Category Manager Modal */}
            {showCategories && (
                <CategoryManager
                    categories={categories}
                    onAdd={handleAddCategory}
                    onDelete={handleDeleteCategory}
                    onClose={() => setShowCategories(false)}
                />
            )}
        </div>
    );
}

export default App;
