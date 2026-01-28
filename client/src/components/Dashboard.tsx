import { ExpenseStats } from '../types';

interface DashboardProps {
    stats: ExpenseStats | null;
}

export default function Dashboard({ stats }: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const topCategories = stats?.categoryBreakdown
        ? Object.entries(stats.categoryBreakdown)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
        : [];

    return (
        <div className="mb-4 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Total Expenses */}
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-slate-500">Total Expenses</p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1 truncate">
                                {stats ? formatCurrency(stats.total) : '-'}
                            </p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Number of Expenses */}
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-slate-500">Number of Expenses</p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 sm:mt-1">
                                {stats?.count ?? '-'}
                            </p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            {topCategories.length > 0 && (
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-700 mb-3 sm:mb-4">Expenses by Category</h3>
                    <div className="space-y-2.5 sm:space-y-3">
                        {topCategories.map(([category, amount]) => {
                            const percentage = stats?.total ? (amount / stats.total) * 100 : 0;
                            return (
                                <div key={category}>
                                    <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                                        <span className="text-slate-700 font-medium truncate mr-2">{category}</span>
                                        <span className="text-slate-500 whitespace-nowrap">{formatCurrency(amount)}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 sm:h-2">
                                        <div
                                            className="bg-primary-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
