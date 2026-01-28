import { useState, useEffect } from 'react';
import { Expense, Category } from '../types';

interface ExpenseFormProps {
    expense?: Expense | null;
    categories: Category[];
    onSubmit: (data: Omit<Expense, 'id' | 'created_at' | 'category'>) => void;
    onClose: () => void;
}

export default function ExpenseForm({ expense, categories, onSubmit, onClose }: ExpenseFormProps) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (expense) {
            setTitle(expense.title);
            setAmount(expense.amount.toString());
            setCategoryId(expense.category_id);
            setDate(expense.date);
            setDescription(expense.description || '');
        } else {
            // Default to today's date for new expenses
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [expense]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !amount || !categoryId || !date) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            await onSubmit({
                title: title.trim(),
                amount: parseFloat(amount),
                category_id: categoryId,
                date,
                description: description.trim() || undefined,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex-shrink-0">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                        {expense ? 'Edit Expense' : 'Add Expense'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors -mr-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                    {/* Title */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Cloud hosting services"
                            className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">৳</span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-7 pr-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional notes about this expense..."
                            rows={3}
                            className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2 sm:pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : expense ? 'Update' : 'Add Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
