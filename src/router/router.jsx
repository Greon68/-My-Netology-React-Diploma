import { createBrowserRouter } from "react-router";
import { About } from "../components/About/About";
import { Catalog } from "../components/Catalog/Catalog";
import { Contacts } from "../components/Contacts/Contacts";
import { HomePage } from "../components/Home/HomePage";
import { MainTemplate } from "../components/Main/MainTemplate";
import { NodFound } from "../components/NodFound/NodFound";
import { ABOUTE_ROUT, CART_ROUT, CATALOG_ROUT, CONTACTS_ROUT, PRODUCT_ROUT } from "./routes";
import { Product } from "../components/Product/Product";
import { Cart } from "../components/Cart/Cart";


// export const HOME_ROUT = '/';
// export const CONTACTS_ROUT = '/contacts';
// export const CATALOG_ROUT = '/catalog';
// export const ABOUTE_ROUT='/about'
// export const NOD_FOUND_ROUT = '*';


export const router = createBrowserRouter([
    {
      path: "/", Component: MainTemplate ,
        children: [

            {index:true , Component : HomePage},

            {path: CATALOG_ROUT,
              children:[
                {index:true , Component: Catalog},
                {path:':id', Component: Product},
              ]
            },

            {path: ABOUTE_ROUT, Component: About},

            {path: CONTACTS_ROUT, Component: Contacts},

            {path: CART_ROUT, Component: Cart},

            {path:'*', Component: NodFound},
        ]
      
    },
  ]);

