"use client";

/**
 * EXAMPLE: User Registration ke Smart Contract
 *
 * Contoh untuk register user baru (Organizer atau KOL)
 */

import { useState } from "react";
import { useRegisterUser, useGetUser } from "@/lib/web3/hooks";
import { UserRole } from "@/lib/web3/types";
import { useAccount } from "wagmi";
import {
  CheckCircle,
  AlertCircle,
  Loader,
  User,
  Briefcase,
} from "lucide-react";

export default function UserRegistrationExample() {
  const { address, isConnected } = useAccount();
  const { data: existingUser } = useGetUser();

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    role: UserRole.KOL,
  });

  const { registerUser, isPending, isConfirming, isSuccess, error, hash } =
    useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      registerUser({
        name: formData.name,
        summary: formData.summary,
        role: formData.role,
      });
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 font-semibold">
            Please connect your wallet first
          </p>
        </div>
      </div>
    );
  }

  if (existingUser && existingUser.name) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Welcome back, {existingUser.name}!
          </h2>
          <p className="text-blue-700">
            Role:{" "}
            {existingUser.role === UserRole.Organizer
              ? "Organizer"
              : "KOL/Influencer"}
          </p>
          <p className="text-blue-600 text-sm mt-2">{existingUser.summary}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
      <p className="text-gray-600 mb-6">
        Register on the blockchain to start using SphereCo
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Summary/Bio */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Bio / Summary
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Select Role</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, role: UserRole.Organizer })
              }
              className={`p-4 border-2 rounded-xl transition-all ${
                formData.role === UserRole.Organizer
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <Briefcase
                className={`w-8 h-8 mx-auto mb-2 ${
                  formData.role === UserRole.Organizer
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <p className="font-semibold">Organizer</p>
              <p className="text-xs text-gray-500 mt-1">Create campaigns</p>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: UserRole.KOL })}
              className={`p-4 border-2 rounded-xl transition-all ${
                formData.role === UserRole.KOL
                  ? "border-pink-600 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <User
                className={`w-8 h-8 mx-auto mb-2 ${
                  formData.role === UserRole.KOL
                    ? "text-pink-600"
                    : "text-gray-400"
                }`}
              />
              <p className="font-semibold">KOL / Influencer</p>
              <p className="text-xs text-gray-500 mt-1">Work on campaigns</p>
            </button>
          </div>
        </div>

        {/* Connected Wallet Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Connected Wallet:</p>
          <p className="font-mono text-sm text-gray-900">{address}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Waiting for wallet...</span>
            </>
          )}
          {isConfirming && (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Registering on blockchain...</span>
            </>
          )}
          {!isPending && !isConfirming && <span>Register Account</span>}
        </button>
      </form>

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">
              Registration successful!
            </p>
            <p className="text-sm text-green-700 mt-1">
              Your profile has been created on the blockchain
            </p>
            <p className="text-xs text-green-600 mt-2">Tx: {hash}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Registration failed</p>
            <p className="text-sm text-red-700 mt-1">{error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
