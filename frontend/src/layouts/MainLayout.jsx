import "./mainlayout.css"
import "./header.css"
import "./footer.css"

import "../pages/style/inicio.css"

import { Outlet } from "react-router-dom"

import Header from "../views/header"
import Footer from "../views/Footer"

export default function MainLayout(){
    return(
        
        <>

            <header>
                <Header/>
            </header>

            <main>
                <div className="main">
                    <Outlet/>
                </div>
            </main>

            <footer>
                <Footer/>
            </footer>
        </>

    )
}