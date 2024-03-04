import { useSelector } from "react-redux";

function Home() {

  const {username,email,address,phone,isAdmin,isLoggedin} = useSelector((state) => (state.auth));

  return (
    <div className="flex flex-1 justify-center items-center text-white text-3xl flex-col">
      <p>
        username = {username}
      </p>
      <p>
        email = {email}
      </p>
      <p>
        address = {address}
      </p>
      <p>
        phone = {phone}
      </p>
      <p>
        isAdmin = {isAdmin ? 'true' : 'false'}
      </p>
      <p>
        isLoggedin = {isLoggedin ? 'true' : 'false'}
      </p>
    </div>
  );
}

export default Home;
