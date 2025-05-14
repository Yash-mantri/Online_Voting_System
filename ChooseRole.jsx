import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-10">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Choose How You Want to Login</h1>
      <div className="flex space-x-10">

        <button
          onClick={() => navigate('/admin-login')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-2xl px-8 py-4 rounded-xl shadow-lg"
        >
          Login as Admin
        </button>

        <button
          onClick={() => navigate('/login')}
          className="bg-green-600 hover:bg-green-700 text-white text-2xl px-8 py-4 rounded-xl shadow-lg"
        >
          Login/Signup as User
        </button>

      </div>
    </div>
  );
};

export default ChooseRole;
