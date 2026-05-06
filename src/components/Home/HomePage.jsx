import { TopSales } from "./TopSales";
import './style.scss'
import { HomeCatalog } from "./HomeCatalog";


export const HomePage =()=>{

    return(
        <>      
         <div className="container">         

            <section className="top-sales">
                <h2 className="text-center">Хиты продаж !</h2>
                <TopSales/>
                
            </section>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <HomeCatalog/>
                
                
                
            </section>
           
        </div>


    </>
    )
}

