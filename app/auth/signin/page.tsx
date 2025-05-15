"use client"

import {Button, Flex, Text} from "@radix-ui/themes"
import {signIn, useSession} from "next-auth/react"
import {useRouter, useSearchParams} from "next/navigation"
import {FcGoogle} from "react-icons/fc"
import axios from "axios"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import React, {useState, useEffect} from "react"

// Define Zod schemas for form validation
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const signupSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
})

// Define types based on the schemas
type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>

export default function SignIn() {
    const router = useRouter()
    const {data: session, status} = useSession()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/issues"

    const [isExpanded, setIsExpanded] = useState(false)
    const [mode, setMode] = useState<"login" | "signup" | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: {errors: loginErrors},
        reset: resetLogin,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: {errors: signupErrors},
        reset: resetSignup,
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    })

    // Redirect if already authenticated
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            router.push(callbackUrl)
        }
    }, [status, session, router, callbackUrl])

    const handleExpand = (selectedMode: "login" | "signup") => {
        setMode(selectedMode)
        setIsExpanded(true)
        setError(null)

        resetLogin()
        resetSignup()
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

    const onLoginSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                redirectTo: callbackUrl as string,
            })

            if (result?.error) {
                setError("Invalid email or password")
            } else if (result?.url) {
                router.push(result.url)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred")
            console.error("Authentication error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const onSignupSubmit = async (data: SignupFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            await axios.post("/api/auth/signup", {
                email: data.email,
                password: data.password,
                name: data.username,
            })

            // After successful registration, sign in the user
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirectTo: callbackUrl as string,
                redirect: false,
            })

            if (result?.error) {
                setError("Registration successful, but login failed. Please try logging in.")
            } else if (result?.url) {
                router.push(result.url)
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Handle specific API errors
                setError(error.response.data.message || "Registration failed. Please try again.")
            } else {
                setError("Registration failed. Please try again.")
            }
            console.error("Registration error:", error)
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
            <div
                className={`mx-auto flex flex-col items-center justify-center p-8 text-white transition-all duration-500 ease-in-out bg-gradient-to-br from-ruby to-ruby-800 ${
                    isExpanded ? "w-full lg:w-[65%]" : "w-[65%] lg:w-[35%]"
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
                ) : mode === "login" ? (
                    <form onSubmit={handleSubmitLogin(onLoginSubmit)}
                          className="w-full max-w-sm space-y-4 flex flex-col">
                        {error && (
                            <div
                                className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md text-sm">{error}</div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                placeholder="your@email.com"
                                autoComplete="username"
                                {...registerLogin("email")}
                            />
                            {loginErrors.email &&
                                <p className="text-red-300 text-xs mt-1">{loginErrors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                {...registerLogin("password")}
                            />
                            {loginErrors.password &&
                                <p className="text-red-300 text-xs mt-1">{loginErrors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            size="3"
                            className="w-full bg-white text-ruby hover:bg-gray-100 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Log In"}
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
                            <FcGoogle className="text-xl"/>
                            <span>Log in with Google</span>
                        </Button>

                        <div className="text-center mt-4">
                            <button
                                onClick={() => {
                                    setIsExpanded(false)
                                    setMode(null)
                                    setError(null)
                                }}
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
                ) : (
                    <form onSubmit={handleSubmitSignup(onSignupSubmit)}
                          className="w-full max-w-sm space-y-4 flex flex-col">
                        {error && (
                            <div
                                className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md text-sm">{error}</div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                placeholder="John Doe"
                                autoComplete="name"
                                {...registerSignup("username")}
                            />
                            {signupErrors.username &&
                                <p className="text-red-300 text-xs mt-1">{signupErrors.username.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="signup-email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                placeholder="your@email.com"
                                autoComplete="email"
                                {...registerSignup("email")}
                            />
                            {signupErrors.email &&
                                <p className="text-red-300 text-xs mt-1">{signupErrors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="signup-password" className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                                disabled={isLoading}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                {...registerSignup("password")}
                            />
                            {signupErrors.password &&
                                <p className="text-red-300 text-xs mt-1">{signupErrors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            size="3"
                            className="w-full bg-white text-ruby hover:bg-gray-100 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Sign Up"}
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
                            <FcGoogle className="text-xl"/>
                            <span>Sign up with Google</span>
                        </Button>

                        <div className="text-center mt-4">
                            <button
                                onClick={() => {
                                    setIsExpanded(false)
                                    setMode(null)
                                    setError(null)
                                }}
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
            <div
                className={`hidden md:flex items-center justify-center p-12 bg-cover bg-center transition-all duration-500 ease-in-out ${
                    isExpanded ? "w-[35%]" : "w-[65%]"
                }`}
                style={{backgroundImage: "url('/images/bg.jpg')"}}
            >
                <div className="p-8 rounded-lg">
                    <div
                        className="text-4xl md:text-5xl text-white text-center max-w-lg tracking-wider font-light select-none">
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
