/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'  // הוספת import של dispatch
import {
    Box,
    Button,
    TextField,
    Typography,
    Divider,
    Paper,
} from '@mui/material'
import { clearCart } from '../features/cart/cartSlice'

export default function OrderSummary() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()  // יצירת ה-dispatch

    const [form, setForm] = React.useState({ name: '', address: '', email: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        const items = Object.values(state.cart).flat()
        try {
            // שליחת ההזמנה לשרת
            await axios.post(`${import.meta.env.VITE_NEST_API_URL}/orders`, {
                ...form,
                items,
            })

            // הצגת הודעה למשתמש
            alert('הזמנה נשלחה בהצלחה')
            dispatch(clearCart())
            navigate('/')
        } catch {
            // טיפול בשגיאות במקרה של בעיה בהזמנה
            alert('אירעה שגיאה בשליחת ההזמנה')
        }
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                סיכום הזמנה
            </Typography>

            <TextField
                fullWidth
                name="name"
                label="שם מלא"
                sx={{ mb: 2 }}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                name="address"
                label="כתובת"
                sx={{ mb: 2 }}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                name="email"
                label="אימייל"
                sx={{ mb: 2 }}
                onChange={handleChange}
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>מוצרים שנבחרו:</Typography>
            {Object.entries(state.cart).map(([category, items]: any, i: number) => (
                <Paper key={i} elevation={1} sx={{ p: 2, mb: 2 }}>
                    <Typography fontWeight="bold">{category}</Typography>
                    <ul style={{ paddingInlineStart: '1.5rem' }}>
                        {items.map((item: any, idx: number) => (
                            <li key={idx}>{item.name} - {item.quantity}</li>
                        ))}
                    </ul>
                </Paper>
            ))}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSubmit}
            >
                אשר הזמנה
            </Button>
        </Box>
    )
}
