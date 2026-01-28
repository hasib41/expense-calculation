import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { CreateCategoryDto } from '../types';

const router = Router();

// Get all categories
router.get('/', async (_req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Create a new category
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name }: CreateCategoryDto = req.body;

        if (!name || name.trim() === '') {
            res.status(400).json({ error: 'Category name is required' });
            return;
        }

        const { data, error } = await supabase
            .from('categories')
            .insert([{ name: name.trim() }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Delete a category
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

export default router;
