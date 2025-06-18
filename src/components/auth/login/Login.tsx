'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Login() {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-800 p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 180],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="rounded-3xl shadow-2xl p-8 bg-white/95 backdrop-blur-sm border-0">
                    <CardContent className="p-0">
                        {/* Header */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center mb-8"
                        >
                            <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaEnvelope className="text-white text-xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-purple-800">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 mt-2">Sign in to your account</p>
                        </motion.div>

                        <div className="space-y-6">
                            {/* Email Input */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-800 rounded-xl blur-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-xl border-2 border-gray-200 group-hover:border-purple-300 focus-within:border-purple-800 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg">
                                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-800 transition-colors duration-300" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                            className="pl-12 pr-4 py-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-transparent rounded-xl text-base"
                                            placeholder=""
                                        />
                                        <Label
                                            htmlFor="email"
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${
                                                emailFocused || email 
                                                    ? '-top-2.5 text-xs text-purple-800 bg-white px-2 font-semibold' 
                                                    : 'top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-gray-600'
                                            }`}
                                        >
                                            Email Address
                                        </Label>
                                    </div>
                                </div>
                                {emailFocused && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-800 rounded-full"
                                    />
                                )}
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-800 rounded-xl blur-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-xl border-2 border-gray-200 group-hover:border-purple-300 focus-within:border-purple-800 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg">
                                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-800 transition-colors duration-300" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                            className="pl-12 pr-12 py-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-transparent rounded-xl text-base"
                                            placeholder=""
                                        />
                                        <Label
                                            htmlFor="password"
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${
                                                passwordFocused || password 
                                                    ? '-top-2.5 text-xs text-purple-800 bg-white px-2 font-semibold' 
                                                    : 'top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-gray-600'
                                            }`}
                                        >
                                            Password
                                        </Label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-800 transition-colors duration-300 p-1 rounded-full hover:bg-purple-50"
                                        >
                                            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                                        </button>
                                    </div>
                                </div>
                                {passwordFocused && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-800 rounded-full"
                                    />
                                )}
                            </motion.div>

                            {/* Forgot Password */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-right"
                            >
                                <Link 
                                    href="/auth/forgot" 
                                    className="text-sm text-purple-800 hover:text-purple-600 hover:underline transition-colors duration-300"
                                >
                                    Forgot password?
                                </Link>
                            </motion.div>

                            {/* Login Button */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <Button className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Sign In
                                </Button>
                            </motion.div>

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="flex items-center gap-4"
                            >
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300" />
                                <span className="text-sm text-gray-500 font-medium">OR</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
                            </motion.div>

                            {/* Social Login Buttons */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <Button 
                                    variant="outline" 
                                    className="flex items-center gap-3 justify-center border-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 rounded-xl py-3"
                                >
                                    <FaFacebookF className="text-blue-600 text-lg" />
                                    <span className="font-medium">Facebook</span>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="flex items-center gap-3 justify-center border-2 hover:border-red-500 hover:bg-red-50 transition-all duration-300 rounded-xl py-3"
                                >
                                    <FaGoogle className="text-red-500 text-lg" />
                                    <span className="font-medium">Google</span>
                                </Button>
                            </motion.div>

                            {/* Sign Up Link */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="text-center"
                            >
                                <p className="text-sm text-gray-600">
                                    Don&apos;t have an account?{' '}
                                    <Link 
                                        href="/auth/signup" 
                                        className="text-purple-800 hover:text-purple-600 hover:underline font-medium transition-colors duration-300"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}