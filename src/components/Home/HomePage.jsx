import { TopSales } from "./TopSales";
import './style.scss'


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
                
                
                {/* <CatalogData/> */}
                
            </section>
           
        </div>


    </>
    )
}

