import { useState } from 'react';
import { Category } from '../types';

interface CategoryManagerProps {
    categories: Category[];
    onAdd: (name: string) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}

export default function CategoryManager({ categories, onAdd, onDelete, onClose }: CategoryManagerProps) {
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setLoading(true);
        try {
            await onAdd(newCategory.trim());
            setNewCategory('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex-shrink-0">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900">Manage Categories</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors -mr-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 sm:p-6 flex-1 overflow-hidden flex flex-col">
                    {/* Add Category Form */}
                    <form onSubmit={handleAdd} className="mb-4 sm:mb-6 flex-shrink-0">
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                            Add New Category
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="e.g., Cloud Services"
                                className="flex-1 px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={loading || !newCategory.trim()}
                                className="px-4 py-2.5 sm:py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            >
                                Add
                            </button>
                        </div>
                    </form>

                    {/* Categories List */}
                    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                        <h3 className="text-xs sm:text-sm font-medium text-slate-700 mb-2 sm:mb-3 flex-shrink-0">
                            Existing Categories ({categories.length})
                        </h3>
                        {categories.length === 0 ? (
                            <p className="text-sm text-slate-500 text-center py-4">
                                No categories yet. Add your first category above.
                            </p>
                        ) : (
                            <div className="space-y-2 overflow-y-auto flex-1 -mx-1 px-1">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between px-3 py-2.5 sm:py-2 bg-slate-50 rounded-lg group"
                                    >
                                        <span className="text-sm text-slate-700 truncate mr-2">{category.name}</span>
                                        <button
                                            onClick={() => onDelete(category.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                            title="Delete category"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2.5 sm:py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
