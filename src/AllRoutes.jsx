import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function AllRoutes(){
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/albums/:id" element={<AlbumDetails/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signUp" element={<SignUpPage/>}/>
        </Routes>
        </>
    )
}
export default AllRoutes