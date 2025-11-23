import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import Login from './pages/Login/Index'; 
import RegisterPage from "./pages/Register/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AssetsPage from "./pages/Assets/Assets";
export function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>

               <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                    <MainLayout />
                    </ProtectedRoute>
                }
                >
                
                <Route index element={<h1>Dashboard</h1>} />
                <Route path="assets" element={<AssetsPage />} />
                <Route path="heirs" element={<h1>Herdeiros</h1>} />
                <Route path="associate" element={<h1>Associar</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
   
}