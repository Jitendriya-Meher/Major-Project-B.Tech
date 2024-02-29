import { useSelector } from "react-redux";

function Dashboard() {

  const {email,username,address,phone} = useSelector((state) => (state.auth));

  return (
    <div className="flex flex-1 justify-center items-center text-white text-3xl w-screen">
      Welcome to Studynotion!     😎😎^_^🥳🥳
      <br />
      {username}
      <br />
      {email}
      <br />
      {address}
      <br />
      {phone}
    </div>
  );
}

export default Dashboard;
