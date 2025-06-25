/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
    CircularProgress
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../features/categories/categoriesSlice'
import type { AppDispatch } from '../store'

interface Product {
    name: string
    quantity: number
    categoryId: number
}

interface Cart {
    [category: string]: Product[]
}

export default function ShoppingList() {
    const dispatch = useDispatch<AppDispatch>()
    const { categories, status, error } = useSelector((state: any) => state.categories) // שליפת הסטייט עם מצב טעינה
    const [selectedCategory, setSelectedCategory] = useState('')
    const [productName, setProductName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState<Cart>({})
    const navigate = useNavigate()

    // שליחת הפעולה לשליפת קטגוריות
    useEffect(() => {
        dispatch(fetchCategories())  // קריאה ל-AsyncThunk
    }, [dispatch])

    const addToCart = () => {
        if (!productName.trim() || !selectedCategory) return

        const category = categories.find((c: any) => c.name === selectedCategory)
        if (!category) return

        setCart((prevCart) => {
            const updated = { ...prevCart }
            if (!updated[selectedCategory]) {
                updated[selectedCategory] = []
            }
            updated[selectedCategory].push({ name: productName, quantity, categoryId: category.id })
            return updated
        })

        setProductName('')
        setQuantity(1)
    }

    if (status === 'loading') {
        return (
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
                <CircularProgress /> {/* מציג את האנימציה של טעינה */}
            </Box>
        )
    }

    if (status === 'failed') {
        return (
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                מסך ראשון – רשימת קניות
            </Typography>

            <Select
                fullWidth
                value={selectedCategory}
                onChange={(e: any) => setSelectedCategory(e.target.value)}
                displayEmpty
                sx={{ mb: 2 }}
            >
                <MenuItem value="">בחר קטגוריה</MenuItem>
                {categories && categories.map((cat: any) => (
                    <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                ))}
            </Select>

            <TextField
                fullWidth
                label="שם המוצר"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                label="כמות"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                inputProps={{ min: 1 }}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" fullWidth onClick={addToCart}>
                הוסף לסל
            </Button>

            <Box mt={4}>
                <Typography variant="h6">סל הקניות:</Typography>
                <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                    {Object.entries(cart).map(([category, items], i) => (
                        <Paper key={i} elevation={3} sx={{ p: 2, width: 230 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                {category}
                            </Typography>
                            <ul style={{ paddingInlineStart: '1.5rem' }}>
                                {items.map((item, idx) => (
                                    <li key={idx}>{item.name} – {item.quantity}</li>
                                ))}
                            </ul>
                        </Paper>
                    ))}
                </Box>
            </Box>

            <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 4 }}
                onClick={() => navigate('/summary', { state: { cart } })}
            >
                המשך להזמנה
            </Button>
        </Box>
    )
}
