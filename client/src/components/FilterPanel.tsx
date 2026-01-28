import { useState } from 'react';
import { Category, ExpenseFilters } from '../types';

interface FilterPanelProps {
    filters: ExpenseFilters;
    categories: Category[];
    onFilterChange: (filters: ExpenseFilters) => void;
}

export default function FilterPanel({ filters, categories, onFilterChange }: FilterPanelProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (key: keyof ExpenseFilters, value: string) => {
        onFilterChange({
            ...filters,
            [key]: value || undefined,
        });
    };

    const clearFilters = () => {
        onFilterChange({});
    };

    const hasActiveFilters = Object.values(filters).some(Boolean);
    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-4 sm:mb-6">
            {/* Header with toggle for mobile */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="sm:cursor-default flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary-600 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                    <svg
                        className={`w-4 h-4 text-slate-400 sm:hidden transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Filter Fields - Always visible on desktop, toggleable on mobile */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 ${!isExpanded ? 'hidden sm:grid' : ''}`}>
                {/* Search */}
                <div className="sm:col-span-2 lg:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">Search</label>
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        value={filters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">Category</label>
                    <select
                        value={filters.category || ''}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                    >
                        <option value="">All categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">From Date</label>
                    <input
                        type="date"
                        value={filters.startDate || ''}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">To Date</label>
                    <input
                        type="date"
                        value={filters.endDate || ''}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>

                {/* Amount Range */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">Amount Range</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minAmount || ''}
                            onChange={(e) => handleChange('minAmount', e.target.value)}
                            className="w-1/2 px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxAmount || ''}
                            onChange={(e) => handleChange('maxAmount', e.target.value)}
                            className="w-1/2 px-3 py-2.5 sm:py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
