import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShoppingList from './pages/ShoppingList'
import OrderSummary from './pages/OrderSummary'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingList />} />
        <Route path="/summary" element={<OrderSummary />} />
      </Routes>
    </BrowserRouter>
  )
}
