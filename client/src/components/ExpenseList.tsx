import { useState } from 'react';
import { Expense } from '../types';
import ExpenseDetail from './ExpenseDetail';

interface ExpenseListProps {
    expenses: Expense[];
    loading: boolean;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

// Color palette for categories
const categoryColors: Record<string, string> = {
    'Infrastructure': 'bg-blue-500',
    'Salaries': 'bg-emerald-500',
    'Software Licenses': 'bg-purple-500',
    'Marketing': 'bg-pink-500',
    'Office Supplies': 'bg-amber-500',
    'Travel': 'bg-cyan-500',
    'Training': 'bg-indigo-500',
    'Utilities': 'bg-orange-500',
    'default': 'bg-slate-500',
};

const getCategoryColor = (categoryName?: string) => {
    if (!categoryName) return categoryColors['default'];
    return categoryColors[categoryName] || categoryColors['default'];
};

export default function ExpenseList({ expenses, loading, onEdit, onDelete }: ExpenseListProps) {
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleExpenseClick = (expense: Expense) => {
        setSelectedExpense(expense);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    if (expenses.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="text-center">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-1">No expenses found</h3>
                    <p className="text-sm sm:text-base text-slate-500">Get started by adding your first expense.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">
                    Expenses ({expenses.length})
                </h3>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-100 border-b-2 border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr
                                key={expense.id}
                                className={`
                                    ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                                    hover:bg-blue-50 transition-colors cursor-pointer
                                    border-b-2 border-slate-100 last:border-b-0
                                `}
                                onClick={() => handleExpenseClick(expense)}
                            >
                                <td className="px-6 py-5">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">{expense.title}</div>
                                        {expense.description && (
                                            <div className="text-xs text-slate-500 truncate max-w-xs mt-1">
                                                {expense.description}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 border border-primary-200">
                                        {expense.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                                    {formatDate(expense.date)}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <span className="text-base font-bold text-slate-900">
                                        {formatCurrency(expense.amount)}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => onEdit(expense)}
                                            className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => onDelete(expense.id)}
                                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View - Improved Design */}
            <div className="md:hidden space-y-4">
                {expenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]"
                        onClick={() => handleExpenseClick(expense)}
                    >
                        {/* Colored top bar based on category */}
                        <div className={`h-1.5 ${getCategoryColor(expense.category?.name)}`}></div>

                        <div className="p-4">
                            {/* Top row: Title and Amount */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <h4 className="text-base font-semibold text-slate-900 leading-tight">
                                    {expense.title}
                                </h4>
                                <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
                                    {formatCurrency(expense.amount)}
                                </span>
                            </div>

                            {/* Description if exists */}
                            {expense.description && (
                                <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                                    {expense.description}
                                </p>
                            )}

                            {/* Bottom row: Category, Date, and View button */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(expense.category?.name)} bg-opacity-10 text-slate-700`}>
                                        <span className={`w-2 h-2 rounded-full ${getCategoryColor(expense.category?.name)} mr-1.5`}></span>
                                        {expense.category?.name || 'Uncategorized'}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatDate(expense.date)}
                                    </span>
                                </div>
                                <div className="flex items-center text-primary-600 text-sm font-medium">
                                    <span>Details</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expense Detail Modal */}
            {selectedExpense && (
                <ExpenseDetail
                    expense={selectedExpense}
                    onClose={() => setSelectedExpense(null)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
        </>
    );
}
