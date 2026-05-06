import {Outlet} from "react-router"
import { Footer } from "./Footer"
import { MainMenu } from "./MainMenu"

export const MainTemplate = ()=> {

    return (
        <>
            <MainMenu/>
            <Outlet/>
            <Footer/>
        </>
    )
}