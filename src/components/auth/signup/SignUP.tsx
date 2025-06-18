'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const passwordChecks = [
    { label: 'Alphabet', regex: /[A-Za-z]/ },
    { label: 'Number', regex: /[0-9]/ },
    { label: 'Special Character', regex: /[^A-Za-z0-9]/ },
];

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const passwordStatus = passwordChecks.map((check) => check.regex.test(password));

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-800 p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30"
                    animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 180] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
                                <FaUser className="text-white text-xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-purple-800">
                                Create Account
                            </h2>
                            <p className="text-gray-600 mt-2">Sign up to get started</p>
                        </motion.div>

                        <div className="space-y-6">
                            {/* First Name & Last Name in one line */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.6 }}
                                className="flex gap-4"
                            >
                                {/* First Name */}
                                <div className="relative group flex-1">
                                    <div className="absolute inset-0 bg-purple-800 rounded-xl blur-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-xl border-2 border-gray-200 group-hover:border-purple-300 focus-within:border-purple-800 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg">
                                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-800 transition-colors duration-300" />
                                        <Input
                                            id="firstName"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onFocus={() => setFirstNameFocused(true)}
                                            onBlur={() => setFirstNameFocused(false)}
                                            className="pl-12 pr-4 py-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-transparent rounded-xl text-base"
                                            placeholder=""
                                        />
                                        <Label
                                            htmlFor="firstName"
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${firstNameFocused || firstName
                                                ? '-top-2.5 text-xs text-purple-800 bg-white px-2 font-semibold'
                                                : 'top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-gray-600'
                                                }`}
                                        >
                                            First Name
                                        </Label>
                                    </div>
                                </div>
                                {/* Last Name */}
                                <div className="relative group flex-1">
                                    <div className="absolute inset-0 bg-purple-800 rounded-xl blur-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-xl border-2 border-gray-200 group-hover:border-purple-300 focus-within:border-purple-800 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg">
                                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-800 transition-colors duration-300" />
                                        <Input
                                            id="lastName"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onFocus={() => setLastNameFocused(true)}
                                            onBlur={() => setLastNameFocused(false)}
                                            className="pl-12 pr-4 py-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-transparent rounded-xl text-base"
                                            placeholder=""
                                        />
                                        <Label
                                            htmlFor="lastName"
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${lastNameFocused || lastName
                                                ? '-top-2.5 text-xs text-purple-800 bg-white px-2 font-semibold'
                                                : 'top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-gray-600'
                                                }`}
                                        >
                                            Last Name
                                        </Label>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Gender */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.28, duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-800 rounded-xl blur-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-xl border-2 border-gray-200 group-hover:border-purple-300 focus-within:border-purple-800 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg px-4 py-3">
                                        <Label className="block text-gray-500 font-medium mb-2" htmlFor="gender">
                                            Gender
                                        </Label>
                                        <div className="flex gap-6">
                                            <label className="flex items-center cursor-pointer gap-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={gender === 'male'}
                                                    onChange={() => setGender('male')}
                                                    className="accent-purple-700 w-4 h-4"
                                                />
                                                <span className={`text-base ${gender === 'male' ? 'text-purple-800 font-semibold' : 'text-gray-600'}`}>Male</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer gap-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={gender === 'female'}
                                                    onChange={() => setGender('female')}
                                                    className="accent-purple-700 w-4 h-4"
                                                />
                                                <span className={`text-base ${gender === 'female' ? 'text-purple-800 font-semibold' : 'text-gray-600'}`}>Female</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer gap-2">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="other"
                                                    checked={gender === 'other'}
                                                    onChange={() => setGender('other')}
                                                    className="accent-purple-700 w-4 h-4"
                                                />
                                                <span className={`text-base ${gender === 'other' ? 'text-purple-800 font-semibold' : 'text-gray-600'}`}>Other</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Email Input */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.31, duration: 0.6 }}
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
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${emailFocused || email
                                                ? '-top-2.5 text-xs text-purple-800 bg-white px-2 font-semibold'
                                                : 'top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-gray-600'
                                                }`}
                                        >
                                            Email Address
                                        </Label>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.34, duration: 0.6 }}
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
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${passwordFocused || password
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
                                {/* Password strength indicator */}
                                <div className="flex gap-4 mt-2 ml-2">
                                    {passwordChecks.map((check, idx) => (
                                        <span
                                            key={check.label}
                                            className={`flex items-center gap-1 text-xs font-medium ${password
                                                ? passwordStatus[idx]
                                                    ? 'text-green-600'
                                                    : 'text-red-500'
                                                : 'text-gray-400'
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full inline-block ${password
                                                    ? passwordStatus[idx]
                                                        ? 'bg-green-500'
                                                        : 'bg-red-400'
                                                    : 'bg-gray-300'
                                                    }`}
                                            ></span>
                                            {check.label}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Confirm Password */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.37, duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-800 rounded-xl blur-sm opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="relative bg-white rounded-xl border-2 border-gray-200 group-hover:border-purple-300 focus-within:border-purple-800 transition-all duration-300 shadow-sm group-hover:shadow-md focus-within:shadow-lg">
                                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-800 transition-colors duration-300" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            onFocus={() => setConfirmPasswordFocused(true)}
                                            onBlur={() => setConfirmPasswordFocused(false)}
                                            className="pl-12 pr-12 py-4 border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-700 placeholder-transparent rounded-xl text-base"
                                            placeholder=""
                                        />
                                        <Label
                                            htmlFor="confirmPassword"
                                            className={`absolute left-12 text-sm transition-all duration-300 pointer-events-none ${confirmPasswordFocused || confirmPassword
                                                ? '-top-2.5 text-xs text-purple-800 bg-white px-2 font-semibold'
                                                : 'top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-gray-600'
                                                }`}
                                        >
                                            Confirm Password
                                        </Label>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-800 transition-colors duration-300 p-1 rounded-full hover:bg-purple-50"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                                        </button>
                                    </div>
                                </div>
                                {/* Confirm password match indicator */}
                                {confirmPassword && (
                                    <div className="ml-2 mt-2 text-xs font-medium flex items-center gap-1">
                                        <span className={`w-2 h-2 rounded-full inline-block ${confirmPassword === password ? 'bg-green-500' : 'bg-red-400'}`}></span>
                                        {confirmPassword === password ? (
                                            <span className="text-green-600">Password matched</span>
                                        ) : (
                                            <span className="text-red-500">Password not matched</span>
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Signup Button */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.45, duration: 0.6 }}
                            >
                                <Button className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Sign Up
                                </Button>
                            </motion.div>

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex items-center gap-4"
                            >
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300" />
                                <span className="text-sm text-gray-500 font-medium">OR</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
                            </motion.div>

                            

                            {/* Sign In Link */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="text-center"
                            >
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        href="/auth/login"
                                        className="text-purple-800 hover:text-purple-600 hover:underline font-medium transition-colors duration-300"
                                    >
                                        Log In
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