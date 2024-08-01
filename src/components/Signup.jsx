// components/Signup.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/authUtils";
import { auth } from "../../firebase.config";
import { socialSite } from "@/utils/userDisplay";
const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [username, setUsername] = useState("");
	const [isAdmin, setIsAdmin] = useState(false)
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await registerUser(email, password);
			if (auth.currentUser) {
				let currentUser = {
                    fName: fName,
                    lName: lName,
                    email:  email,
                    username: username,
					uid: auth.currentUser.uid,
                    id: "docId",
					isAdmin: isAdmin
                }
				const docId = await socialSite.addUser(currentUser);
			
				currentUser.id = docId;
                socialSite.updateUser(currentUser);
				router.push("/users");
			} // Redirect to the Users page
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	return (
		<div className="items-center justify-center py-8">
			<div className="w-full max-w-md p-8 mx-auto space-y-8 bg-white rounded shadow-lg">
				<h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
						<label htmlFor="fname" className="block text-sm font-medium">
							First Name
						</label>
						<input
							id="fName"
							name="fName"
							type="fName"
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
							value={fName}
							onChange={(e) => setFName(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="lName" className="block text-sm font-medium">
							Last Name
						</label>
						<input
							id="lName"
							name="lName"
							type="lName"
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
							value={lName}
							onChange={(e) => setLName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="username" className="block text-sm font-medium">
							Username
						</label>
						<input
							id="username"
							name="username"
							type="username"
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
