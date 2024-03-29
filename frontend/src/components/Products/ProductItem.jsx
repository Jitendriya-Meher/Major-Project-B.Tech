import React from 'react'
import { Link } from 'react-router-dom';
import "./ProductItem.css"

const ProductItem = ({product}) => {
  return (
    <div className='item bg-gray-800/80 p-2'>
        <Link to={`/product/${product._id}`} onClick={window.scrollTo(0,0)}>
            <img src={product.image} alt="item" />
        </Link>
        <p>
            {
                product.name 
            }
        </p> 
        <div className="item-prices">
            <div className="item-price-new">
                ₹{
                    product.newPrice
                }
            </div>
            <div className="item-price-old">
                ₹{
                    product.oldPrice 
                }
            </div>
        </div>
    </div>
  )
}

export default ProductItem