import { CardView } from "./CardView";

export const CatalogPreview = (props)=>{
    const {previewList} = props
    return(
        <div className="home-catalog-goods">
           {
            previewList.map ( good => < CardView key={good.id} {...good} />)
           } 
        </div>
    )
}