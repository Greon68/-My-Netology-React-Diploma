/* Компонент хитов продаж на домашней странице */

import { CardView } from "../Catalog/CardView";
import { useGetFetch } from "../../hook/useGetFetch";
import { Loader } from "../Loader/Loader";
import "./style.scss";

export const TopSales = () => {
  const [sales, loading, error] = useGetFetch("/api/top-sales");

  console.log(" TopSales sales -", sales);

  return (
    <div className="top-sales-block">
      {loading && (
        <div className="loading text-center">
          <h3> Загрузка хитов продаж...</h3>
          <Loader />
        </div>
      )}

      {error && (
        <div className="text-center">
          <h3> Ошибка загрузки хитов продаж...</h3>
        </div>
      )}
      {sales &&
        sales.map((sale) => (
          <CardView key={sale.id} className="top-sales-card" {...sale} />
        ))}
    </div>
  );
};
