"use client";
import { useState } from "react";
import Signup from "@/components/Signup";
import Login from "@/components/Login";

export default function Home() {
  const [logingIn, setLogingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  function handleLoginSignup(login, signup) {
    return () => {
      setLogingIn(login);
      setSigningUp(signup);
    };
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Socially Crypto!</h2>
        <p className="mb-6 text-gray-600">
          Please login or signup to get started.
        </p>
        <div className="flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            onClick={handleLoginSignup(true, false)}
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            onClick={handleLoginSignup(false, true)}
          >
            Signup
          </button>
        </div>
        {logingIn && <Login />}
        {signingUp && <Signup />}
      </section>
    </main>
  );
}