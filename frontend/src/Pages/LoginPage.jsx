import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-[#2D2926FF] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#E94B3CFF] to-[#2D2926FF] text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='transition-colors duration-200'
						aria-label='Email Address' // Added for accessibility
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='transition-colors duration-200'
						aria-label='Password' // Added for accessibility
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-[#E94B3CFF] hover:underline'>
							Forgot password?
						</Link>
					</div>

					{error && <p className='text-[#E94B3CFF] font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-[#E94B3CFF] text-white font-bold rounded-lg shadow-lg
						hover:bg-[#2D2926FF] focus:outline-none focus:ring-2 focus:ring-[#E94B3CFF] focus:ring-offset-2 focus:ring-offset-[#2D2926FF] transition duration-200'
						type='submit'
						disabled={isLoading} // Disable the button during loading
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-[#2D2926FF] bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-[#E94B3CFF] hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default LoginPage;
