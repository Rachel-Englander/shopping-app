import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// מגדירים את מבנה המידע
export interface Category {
  id: number
  name: string
}

// פעולת ה-`AsyncThunk` שמבצעת בקשה ל-API כדי לקבל את הקטגוריות
export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get<Category[]>(`${import.meta.env.VITE_API_URL}/categories`)
  return res.data
})

// ה-Slice של הקטגוריות
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [] as Category[],  // רשימה של קטגוריות
    status: 'idle', // מצב ברירת מחדל
    error: null as string | null,  // לא קיימת שגיאה בהתחלה
  },
  reducers: {},  // כרגע אין reducers נוספים
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'  // מצב טעינה
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded'  // טעינה הצליחה
        state.categories = action.payload
        state.error = null // אם התשובה הצליחה, לא יהיה שום error
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'  // אם הייתה שגיאה
        state.error = action.error.message || 'Something went wrong'  // להציג את השגיאה
      })
  },
})

// הפונקציה הזו תייצא את ה-reducer של הקטגוריות
export default categoriesSlice.reducer
