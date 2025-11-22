import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"


export function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
   
}