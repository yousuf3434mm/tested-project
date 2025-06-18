'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
// Import shadcn/ui OTP input
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function Forgot() {
    const [email, setEmail] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');

    // Simulate sending reset link and show OTP input
    const handleSendReset = (e: React.FormEvent) => {
        e.preventDefault();
        setShowOtp(true);
    };

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
                                Forgot Password
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {showOtp
                                    ? "Enter the OTP sent to your email"
                                    : "Enter your email to reset your password"}
                            </p>
                        </motion.div>

                        <form onSubmit={handleSendReset}>
                            <div className="space-y-6">
                                {/* Email Input */}
                                {!showOtp && (
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
                                                    required
                                                />
                                                <Label
                                                    htmlFor="email"
                                                    className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${emailFocused || email
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
                                )}

                                {/* OTP Input */}
                                {showOtp && (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="relative group flex flex-col items-center"
                                    >
                                        <Label
                                            htmlFor="otp"
                                            className="mb-2 text-purple-800 font-semibold text-sm"
                                        >
                                            Enter OTP
                                        </Label>
                                        <InputOTP
                                            maxLength={6}
                                            value={otp}
                                            onChange={setOtp}
                                            className="mx-auto"
                                        >
                                            <InputOTPGroup>
                                                {[...Array(6)].map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className="w-10 h-12 text-xl border-2 border-gray-200 rounded-lg focus:border-purple-800 focus:ring-0 transition-all bg-white shadow-sm mx-1"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                        <div className="mt-4 w-full">
                                            <Button
                                                type="button"
                                                className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                            >
                                                Verify OTP
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Reset Button */}
                                {!showOtp && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            Send Reset Link
                                        </Button>
                                    </motion.div>
                                )}

                                {/* Back to Login Link */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="text-center"
                                >
                                    <p className="text-sm text-gray-600">
                                        Remember your password?{' '}
                                        <Link
                                            href="/auth/login"
                                            className="text-purple-800 hover:text-purple-600 hover:underline font-medium transition-colors duration-300"
                                        >
                                            Log In
                                        </Link>
                                    </p>
                                </motion.div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}