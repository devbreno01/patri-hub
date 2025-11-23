import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import Login from './pages/Login/Index'; 
import RegisterPage from "./pages/Register/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
export function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<MainLayout />}>  </Route> */}
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>


                  <Route path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                    />
            </Routes>
        </BrowserRouter>
    )
   
}