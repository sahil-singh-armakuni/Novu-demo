"use client";

import { FC, useState, useCallback } from "react";

interface LoginProps {
  setLogin: (value: string) => void;
}

const Login: FC<LoginProps> = ({ setLogin }) => {
  const [username, setUsername] = useState<string>("");

  const submitForm = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setLogin(username);
      return false;
    },
    [username, setLogin]
  );

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form
        className="bg-white w-[80%] shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitForm}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
