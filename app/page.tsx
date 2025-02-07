"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(()=>{
    if (session) {
      const user = session["user"];
      console.log("Session User ", user);
      redirect("/dashboard");
    }
  },[session])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username: email,
      password: password,
    });

    console.log("SignIn Response:", result)

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard"); // Redirect after successful login
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center  shadow-xl  min-h-screen bg-gray-100">
        <div className="bg-white w-[424px] p-6 rounded-lg shadow-md">
          <div className="flex flex-col-reverse justify-center items-center">
            <h2 className="text-2xl Headings font-semibold text-gray-800 mb-6">
              Sign In
            </h2>
            <div className="w-14">
              <Image src={"/login.gif"} height={500} width={500} alt="gif" />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            {/* Remember Me Checkbox */}
            {/* <div className="flex items-center pb-4">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-600 text-sm">
                Remember me?
              </label>
            </div> */}
            {/* Submit Button */}
            
              <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                Sign in
              </button>
           

            {/* Forget Password */}
            
          </form>
          {/* Divider */}
          {/* <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div> */}

          {/* Social Sign In */}
          {/* <div>
            <button
              onClick={() => signIn("google")}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 
py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
focus-visible:outline focus-visible:outline-2 
focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <div className="flex">
                Sign in with Google
                <span className="mx-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="none" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 
22.8309 9.90909H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 
17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7636 23.04 12.2614Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23.4998C15.105 23.4998 17.7081 22.4701 19.6109 
20.7137L15.8943 17.8282C14.8645 18.5182 13.5472 18.926 12 18.926C9.00474 18.926 6.
46951 16.903 5.56519 14.1848H1.72314V17.1644C3.61542 20.9228 7.50451 23.4998 12 23.4998Z"
                      fill="#34A853"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.758 
5.20455 12.0001C5.20455 11.2421 5.33523 10.5051 5.56523 
9.81506V6.83551H1.72318C0.944318 8.38801 0.5 10.1444 0.5 12.0001C0.5 13.8557 
0.944318 15.6121 1.72318 17.1646L5.56523 14.1851Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 
6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 
3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z"
                      fill="#EA4335"
                    />
                  </svg>
                </span>
              </div>
            </button>
          </div> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
