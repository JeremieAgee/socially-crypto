"use client";
import { useState } from "react";
import { login } from "@/utils/authUtils";
import { useRouter } from 'next/navigation';
import { auth } from "../../firebase.config"

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			if (auth.currentUser) {
				router.push('/users')
			}
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};

	return (
		<div className="flex items-center justify-center p-8">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
				<h2 className="text-2xl font-bold text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
