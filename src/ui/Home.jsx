import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {

  const username = useSelector(stata=> stata.user.username)
  return (
    <div  className="text-center my-4 text-sm sm:text-base">
      <h1 className='text-sm sm:text-3xl mb-4  text-stone-800 font-semibold '>
        The best pizza.
        <br />
        <span className="text-yellow-500
        " >

        Straight out of the oven, straight to you.
        </span>
      </h1>

     { username === '' ? <CreateUser/>
     : <Button to='/menu' size='primary'>{username},Continou ordering </Button>}
    </div>
  );
}

export default Home;
