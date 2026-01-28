import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const url = req.url || '';
    const path = url.replace('/api', '');

    try {
        // Route: GET /api/expenses
        if (path === '/expenses' && req.method === 'GET') {
            const { startDate, endDate, category, minAmount, maxAmount, search } = req.query;

            let query = supabase
                .from('expenses')
                .select('*, category:categories(id, name)')
                .order('date', { ascending: false });

            if (startDate) query = query.gte('date', startDate as string);
            if (endDate) query = query.lte('date', endDate as string);
            if (category) query = query.eq('category_id', category as string);
            if (minAmount) query = query.gte('amount', Number(minAmount));
            if (maxAmount) query = query.lte('amount', Number(maxAmount));
            if (search) query = query.ilike('title', `%${search}%`);

            const { data, error } = await query;
            if (error) throw error;
            return res.status(200).json(data);
        }

        // Route: GET /api/expenses/stats/summary
        if (path === '/expenses/stats/summary' && req.method === 'GET') {
            const { data: expenses, error } = await supabase
                .from('expenses')
                .select('amount, category_id');

            if (error) throw error;

            const total = expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
            const count = expenses?.length || 0;

            const { data: categoryData, error: catError } = await supabase
                .from('expenses')
                .select('amount, category:categories(name)');

            if (catError) throw catError;

            const categoryBreakdown: Record<string, number> = {};
            categoryData?.forEach((exp) => {
                const category = exp.category as unknown as { name: string } | null;
                const catName = category?.name || 'Uncategorized';
                categoryBreakdown[catName] = (categoryBreakdown[catName] || 0) + Number(exp.amount);
            });

            return res.status(200).json({ total, count, average: count > 0 ? total / count : 0, categoryBreakdown });
        }

        // Route: POST /api/expenses
        if (path === '/expenses' && req.method === 'POST') {
            const { title, amount, category_id, date, description } = req.body;

            if (!title || !amount || !category_id || !date) {
                return res.status(400).json({ error: 'Title, amount, category, and date are required' });
            }

            const { data, error } = await supabase
                .from('expenses')
                .insert([{ title, amount, category_id, date, description }])
                .select('*, category:categories(id, name)')
                .single();

            if (error) throw error;
            return res.status(201).json(data);
        }

        // Route: PUT /api/expenses/:id
        if (path.startsWith('/expenses/') && req.method === 'PUT') {
            const id = path.split('/')[2];
            const updates = req.body;

            const { data, error } = await supabase
                .from('expenses')
                .update(updates)
                .eq('id', id)
                .select('*, category:categories(id, name)')
                .single();

            if (error) throw error;
            return res.status(200).json(data);
        }

        // Route: DELETE /api/expenses/:id
        if (path.startsWith('/expenses/') && req.method === 'DELETE') {
            const id = path.split('/')[2];

            const { error } = await supabase
                .from('expenses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return res.status(204).end();
        }

        // Route: GET /api/categories
        if (path === '/categories' && req.method === 'GET') {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (error) throw error;
            return res.status(200).json(data);
        }

        // Route: POST /api/categories
        if (path === '/categories' && req.method === 'POST') {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Name is required' });
            }

            const { data, error } = await supabase
                .from('categories')
                .insert([{ name }])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json(data);
        }

        // Route: DELETE /api/categories/:id
        if (path.startsWith('/categories/') && req.method === 'DELETE') {
            const id = path.split('/')[2];

            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return res.status(204).end();
        }

        // 404 for unknown routes
        return res.status(404).json({ error: 'Not found' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
