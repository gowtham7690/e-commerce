import { useNavigate } from "react-router-dom";
import logo from "../../assets/images.jpeg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";

const initialState = {
  email: '',
  password: ''
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value 
    });
  };
  const validate = (data) => {
    const temp = {};
    if (!data.email) temp.email = "Username is required";
    if (!data.password) {
      temp.password = "Password is required";
    }
    setError(temp);
    return Object.keys(temp).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
        dispatch(loginUser(formData)).
        then((data) => {
          console.log(data);
          if(data?.payload?.success)
              navigate('/shop/home');
        })
      }
    setFormData(initialState);
  }

  return (
    <div className="flex">
      <div className="basis-1/2 bg-slate-400 min-h-screen hidden text-center content-center lg:flex lg:flex-col">
        <h1><b>WELCOME TO MY ECOMMERCE</b></h1>
        <img src={logo} alt="Welcome" /> 
      </div> 
      <div className="flex flex-row basis-full bg-slate-600 min-h-screen items-center justify-center lg:basis-1/2">
        <div className="flex flex-col p-[20px] h-[500px] w-[400px] gap-3 border-slate-950 border-2 rounded-lg md:flex-row md:w-[700px]">
          <div className="md:basis-1/2 basis-0">
            <a href="#">Logo</a>
            <h1 className="p-t-[10px]">WELCOME BACK!</h1>
          </div>
          <div className="flex flex-col gap-4 justify-center basis-0 md:basis-1/2">
            <p className="text-3xl font-bold text-slate-100 text-center tracking-tight text-foreground cursor-default">
              Login to your account
            </p>
            <p className="text-center">
              Create a new account?
              <a onClick={() => navigate('/signup')} className="font-medium text-primary pl-2 cursor-pointer">
                Sign Up
              </a>
            </p>
            
            <form onSubmit = {handleSubmit} className="flex flex-col gap-4">
              <input 
                type="text" 
                name="email"  
                value={formData.email}
                onChange={handleInputChange} 
                className="h-[35px] w-full rounded-md border-2 border-gray-300 pl-2 focus:border-blue-500 focus:outline-none"
                placeholder="Username"
              />
              {error.email && <p className="text-red-600">{error.email}</p>}
              <input 
                type="password" 
                name="password"  
                value={formData.password}
                onChange={handleInputChange}  
                className="h-[35px] w-full rounded-md border-2 border-gray-300 pl-2 focus:border-blue-500 focus:outline-none"
                placeholder="Password"
              />
            {error.password && <p className="text-red-600">{error.password}</p>}    
              
              <input type="submit" value="Login" className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"/>
            </form>
            <a href="#" className="flex justify-end">Forgot password?</a>
          </div>
        </div>
      </div> 
    </div>
  );
}
