import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { ExpenseFilters, CreateExpenseDto, UpdateExpenseDto } from '../types';

const router = Router();

// Get all expenses with optional filters
router.get('/', async (req: Request, res: Response) => {
    try {
        const {
            startDate,
            endDate,
            category,
            minAmount,
            maxAmount,
            search
        }: ExpenseFilters = req.query;

        let query = supabase
            .from('expenses')
            .select(`
        *,
        category:categories(id, name)
      `)
            .order('date', { ascending: false });

        // Apply filters
        if (startDate) {
            query = query.gte('date', startDate);
        }

        if (endDate) {
            query = query.lte('date', endDate);
        }

        if (category) {
            query = query.eq('category_id', category);
        }

        if (minAmount) {
            query = query.gte('amount', Number(minAmount));
        }

        if (maxAmount) {
            query = query.lte('amount', Number(maxAmount));
        }

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

// Get expense by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('expenses')
            .select(`
        *,
        category:categories(id, name)
      `)
            .eq('id', id)
            .single();

        if (error) throw error;

        if (!data) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({ error: 'Failed to fetch expense' });
    }
});

// Create a new expense
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, amount, category_id, date, description }: CreateExpenseDto = req.body;

        // Validation
        if (!title || !amount || !category_id || !date) {
            res.status(400).json({ error: 'Title, amount, category, and date are required' });
            return;
        }

        const { data, error } = await supabase
            .from('expenses')
            .insert([{ title, amount, category_id, date, description }])
            .select(`
        *,
        category:categories(id, name)
      `)
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ error: 'Failed to create expense' });
    }
});

// Update an expense
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates: UpdateExpenseDto = req.body;

        const { data, error } = await supabase
            .from('expenses')
            .update(updates)
            .eq('id', id)
            .select(`
        *,
        category:categories(id, name)
      `)
            .single();

        if (error) throw error;

        if (!data) {
            res.status(404).json({ error: 'Expense not found' });
            return;
        }

        res.json(data);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

// Delete an expense
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

// Get expense statistics
router.get('/stats/summary', async (_req: Request, res: Response) => {
    try {
        // Get total expenses
        const { data: expenses, error } = await supabase
            .from('expenses')
            .select('amount, category_id, date');

        if (error) throw error;

        const total = expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
        const count = expenses?.length || 0;

        // Get category breakdown
        const { data: categoryData, error: catError } = await supabase
            .from('expenses')
            .select(`
        amount,
        category:categories(name)
      `);

        if (catError) throw catError;

        const categoryBreakdown: Record<string, number> = {};
        categoryData?.forEach((exp) => {
            const catName = (exp.category as { name: string })?.name || 'Uncategorized';
            categoryBreakdown[catName] = (categoryBreakdown[catName] || 0) + Number(exp.amount);
        });

        res.json({
            total,
            count,
            average: count > 0 ? total / count : 0,
            categoryBreakdown
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

export default router;
