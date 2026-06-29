import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogDetail from './pages/BlogDetail'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />

              {/* Protected Routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/blogs/new" element={<CreateBlog />} />
                <Route path="/blogs/:id/edit" element={<EditBlog />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App