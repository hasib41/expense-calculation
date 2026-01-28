import { useState } from 'react';
import { Expense } from '../types';
import ExpenseDetail from './ExpenseDetail';

interface ExpenseListProps {
    expenses: Expense[];
    loading: boolean;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

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
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700">
                        Expenses ({expenses.length})
                    </h3>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {expenses.map((expense) => (
                                <tr
                                    key={expense.id}
                                    className="hover:bg-blue-50 transition-colors cursor-pointer"
                                    onClick={() => handleExpenseClick(expense)}
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-slate-900">{expense.title}</div>
                                            {expense.description && (
                                                <div className="text-sm text-slate-500 truncate max-w-xs">
                                                    {expense.description}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                            {expense.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {formatDate(expense.date)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900 text-right">
                                        {formatCurrency(expense.amount)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => onEdit(expense)}
                                                className="p-2 text-slate-400 hover:text-primary-600 transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onDelete(expense.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
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

                {/* Mobile Card View - Better separation */}
                <div className="md:hidden p-3 space-y-3 bg-slate-50">
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-primary-200 transition-all active:scale-[0.98]"
                            onClick={() => handleExpenseClick(expense)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-1">
                                        {expense.title}
                                    </h4>
                                    {expense.description && (
                                        <p className="text-xs text-slate-500 truncate mb-2">
                                            {expense.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                            {expense.category?.name || 'Uncategorized'}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {formatDate(expense.date)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-base font-bold text-primary-600 whitespace-nowrap">
                                        {formatCurrency(expense.amount)}
                                    </span>
                                    <div className="flex items-center text-xs text-slate-400 mt-1">
                                        <span>View</span>
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
