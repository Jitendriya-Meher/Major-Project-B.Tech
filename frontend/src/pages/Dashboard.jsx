import { useSelector } from "react-redux";
import all_product from "../assets/all_product";
import ProductItem from "../components/Products/ProductItem";

function Dashboard() {

  const {email,username,address,phone} = useSelector((state) => (state.auth));

  all_product.sort((pro1,pro2)=>(pro2.id - pro1.id ));

  return (
    <div className="flex flex-1 justify-center items-center text-white text-3xl w-screen">
      <div className=" my-12 flex flex-wrap items-center justify-center gap-12">
        {
          all_product.map((product)=>(
            <ProductItem key={product.id} product={product}></ProductItem>
          ))
        }
      </div>
    </div>
  );
}

export default Dashboard;
