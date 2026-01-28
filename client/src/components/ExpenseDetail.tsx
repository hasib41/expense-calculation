import { Expense } from '../types';

interface ExpenseDetailProps {
    expense: Expense;
    onClose: () => void;
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export default function ExpenseDetail({ expense, onClose, onEdit, onDelete }: ExpenseDetailProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleEdit = () => {
        onEdit(expense);
        onClose();
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this expense?')) {
            onDelete(expense.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4" onClick={onClose}>
            <div
                className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Expense Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors -mr-2"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                    {/* Amount - Prominent Display */}
                    <div className="text-center py-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl">
                        <p className="text-sm text-slate-500 mb-1">Amount</p>
                        <p className="text-3xl sm:text-4xl font-bold text-primary-600">
                            {formatCurrency(expense.amount)}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3">
                        {/* Title */}
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">Title</p>
                                <p className="text-sm font-medium text-slate-900">{expense.title}</p>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">Category</p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                                    {expense.category?.name || 'Uncategorized'}
                                </span>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">Date</p>
                                <p className="text-sm font-medium text-slate-900">{formatDate(expense.date)}</p>
                            </div>
                        </div>

                        {/* Description */}
                        {expense.description && (
                            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-slate-500">Description</p>
                                    <p className="text-sm text-slate-700 mt-1">{expense.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex gap-3">
                    <button
                        onClick={handleDelete}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                    <button
                        onClick={handleEdit}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
