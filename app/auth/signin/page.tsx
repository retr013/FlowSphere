// 'use client'
//
// import {useState} from 'react'
// import {Button, Flex, Text} from '@radix-ui/themes'
// import {signIn, useSession} from "next-auth/react"
// import {redirect, useSearchParams} from "next/navigation";
//
//
// export default function SignIn() {
//
//     const {data: session} = useSession()
//
//     if (session?.user) {
//         redirect('/issues')
//     }
//
//     const searchParams = useSearchParams();
//     const callbackUrl = searchParams.get('callbackUrl') || '/issues';
//
//     const [isExpanded, setIsExpanded] = useState(false)
//     const [mode, setMode] = useState<'login' | 'signup' | null>(null)
//
//     const handleExpand = (selectedMode: 'login' | 'signup') => {
//         setMode(selectedMode)
//         setIsExpanded(true)
//     }
//
//     const handleGoogleSignIn = async () => {
//         const result = await signIn('google');
//
//         if (result?.error) {
//             console.error('Google Sign-In failed:', result.error);
//         } else {
//             redirect(callbackUrl)
//         }
//     };
//
//     return (
//         <div className="flex h-screen w-full overflow-hidden transition-all duration-400">
//             {/* Left Panel */}
//             <div
//                 className={`flex flex-col items-center justify-center p-8 text-white transition-all duration-500 ease-in-out ${
//                     isExpanded ? 'w-[65%]' : 'w-[35%]'
//                 }`}
//             >
//                 <h1 className="text-4xl font-bold mb-8">
//                     {mode === 'signup' ? 'Create Account' : mode === 'login' ? 'Welcome Back' : 'Welcome'}
//                 </h1>
//
//                 {!isExpanded ? (
//                     <Flex direction="column" gap="4">
//                         <Button
//                             variant="solid"
//                             size="3"
//                             className="mb-4 bg-white text-ruby hover:bg-gray-100 cursor-pointer"
//                             onClick={() => handleExpand('login')}
//                         >
//                             Log In
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="3"
//                             className="border-white text-white hover:bg-white hover:text-ruby cursor-pointer"
//                             onClick={() => handleExpand('signup')}
//                         >
//                             Sign Up
//                         </Button>
//                     </Flex>
//                 ) : (
//                     <form className="w-full max-w-sm space-y-4 flex flex-col">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className="w-full px-4 py-2 rounded bg-white text-black placeholder-black focus:outline-none"
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="w-full px-4 py-2 rounded bg-white text-black placeholder-black focus:outline-none"
//                         />
//                         <Button size="3" className="w-full bg-white text-ruby hover:bg-gray-100 cursor-pointer">
//                             {mode === 'signup' ? 'Sign Up' : 'Log In'}
//                         </Button>
//                         <div className="flex items-center my-6">
//                             <div className="flex-grow border-t border-gray-300"></div>
//                             <span className="mx-4 text-sm text-gray-500">OR</span>
//                             <div className="flex-grow border-t border-gray-300"></div>
//                         </div>
//                         <button
//                             className='max-w-fit bg-white text-black p-2.5 mt-2.5 justify-self-center mx-auto rounded hover:bg-[#e54666] transition-all duration-300 cursor-pointer'
//                             onClick={() => signIn('google')}>Log in With Google
//                         </button>
//                         <button onClick={() => redirect('/issues')}>issues</button>
//                     </form>
//                 )}
//             </div>
//
//             {/* Right Panel */}
//             <div
//                 className={`flex items-center justify-center p-12 bg-cover bg-center transition-all duration-700 ease-in-out ${
//                     isExpanded ? 'w-[35%]' : 'w-[65%]'
//                 }`}
//                 style={{backgroundImage: "url('/images/bg.jpg')"}}
//             >
//                 <div
//                     className="text-5xl text-white text-center max-w-lg tracking-widest font-light p-1.5 rounded-lg select-none">
//                     <Text>
//                         {mode === 'signup'
//                             ? 'Join the platform and discover your full potential.'
//                             : mode === 'login'
//                                 ? 'Glad to see you again. Let’s get productive!'
//                                 : 'Build better things. Empower your ideas.'}
//                     </Text>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button, Flex, Text } from "@radix-ui/themes"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

export default function SignIn() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/issues"

    const [isExpanded, setIsExpanded] = useState(false)
    const [mode, setMode] = useState<"login" | "signup" | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Redirect if already authenticated
    if (status === "authenticated" && session?.user) {
        router.push(callbackUrl)
        return null // Return null to prevent rendering while redirecting
    }

    const handleExpand = (selectedMode: "login" | "signup") => {
        setMode(selectedMode)
        setIsExpanded(true)
        setError(null) // Clear any previous errors
    }

    const handleGoogleSignIn = async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signIn("google", {
                callbackUrl,
                redirect: false,
            })

            if (result?.error) {
                setError("Google Sign-In failed. Please try again.")
                console.error("Google Sign-In failed:", result.error)
            } else if (result?.url) {
                router.push(result.url)
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
            console.error("Sign-in error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        if (!email || !password) {
            setError("Please enter both email and password")
            setIsLoading(false)
            return
        }

        try {
            // For login mode
            if (mode === "login") {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                    callbackUrl,
                })

                if (result?.error) {
                    setError("Invalid email or password")
                } else if (result?.url) {
                    router.push(result.url)
                }
            }
            // For signup mode - you would implement your registration logic here
            else if (mode === "signup") {
                // Example: Call your registration API
                // const response = await fetch('/api/auth/register', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ email, password }),
                // })

                // if (!response.ok) {
                //   const data = await response.json()
                //   throw new Error(data.message || 'Failed to create account')
                // }

                // After successful registration, sign in the user
                // await signIn('credentials', { email, password, callbackUrl, redirect: false })

                // For now, just show a message
                setError("Signup functionality is not implemented yet")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred")
            console.error("Authentication error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const goToIssues = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push("/issues")
    }

    return (
        <div className="flex h-screen w-full overflow-hidden transition-all duration-400">
            {/* Left Panel */}
            <div
                className={`flex flex-col items-center justify-center p-8 text-white transition-all duration-500 ease-in-out bg-gradient-to-br from-ruby to-ruby-800 ${
                    isExpanded ? "w-[65%]" : "w-[35%]"
                }`}
            >
                <h1 className="text-4xl font-bold mb-8">
                    {mode === "signup" ? "Create Account" : mode === "login" ? "Welcome Back" : "Welcome"}
                </h1>

                {!isExpanded ? (
                    <Flex direction="column" gap="4" className="w-full max-w-xs">
                        <Button
                            variant="solid"
                            size="3"
                            className="mb-4 bg-white text-ruby hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleExpand("login")}
                            disabled={isLoading}
                        >
                            Log In
                        </Button>
                        <Button
                            variant="outline"
                            size="3"
                            className="border-white text-white hover:bg-white/10 cursor-pointer"
                            onClick={() => handleExpand("signup")}
                            disabled={isLoading}
                        >
                            Sign Up
                        </Button>
                    </Flex>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 flex flex-col">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md text-sm">{error}</div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            size="3"
                            className="w-full bg-white text-ruby hover:bg-gray-100 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : mode === "signup" ? "Sign Up" : "Log In"}
                        </Button>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-white/30"></div>
                            <span className="mx-4 text-sm text-white/70">OR</span>
                            <div className="flex-grow border-t border-white/30"></div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="3"
                            className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center gap-2"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <FcGoogle className="text-xl" />
                            <span>{mode === "signup" ? "Sign up" : "Log in"} with Google</span>
                        </Button>

                        <div className="text-center mt-4">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="text-sm text-white/70 hover:text-white underline"
                                type="button"
                                disabled={isLoading}
                            >
                                Go back
                            </button>

                            <button
                                onClick={goToIssues}
                                className="text-sm text-white/70 hover:text-white underline ml-4"
                                type="button"
                                disabled={isLoading}
                            >
                                View issues
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Right Panel */}
            <div
                className={`flex items-center justify-center p-12 bg-cover bg-center transition-all duration-700 ease-in-out ${
                    isExpanded ? "w-[35%]" : "w-[65%]"
                }`}
                style={{ backgroundImage: "url('/images/bg.jpg')" }}
            >
                <div className="p-8 rounded-lg">
                    <div className="text-4xl md:text-5xl text-white text-center max-w-lg tracking-wider font-light select-none">
                        <Text>
                            {mode === "signup"
                                ? "Join the platform and discover your full potential."
                                : mode === "login"
                                    ? "Glad to see you again. Let's get productive!"
                                    : "Build better things. Empower your ideas."}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
