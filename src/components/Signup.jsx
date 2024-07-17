import { useState } from "react";
import { registerUser } from "@/utils/authUtils";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log("Email:", email);
    console.log("Password:", password);
    await registerUser(email, password);
  };

  return (
    <div className="items-center justify-center py-8 bg-emerald-50">
      <p className="py-4 text-2xl font-bold text-center text-emerald-600">
        Please SignUp or Login to start managing our library
      </p>
      <div className="w-full max-w-md p-8 mx-auto space-y-8 bg-white rounded shadow-lg y-4">
        <h2 className="text-2xl font-bold text-center text-emerald-600">
          SignUp
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-emerald-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-emerald-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;