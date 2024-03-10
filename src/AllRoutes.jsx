import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";

function AllRoutes(){
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/albums/:id" element={<AlbumDetails/>}/>
        </Routes>
        </>
    )
}
export default AllRoutes