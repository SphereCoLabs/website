"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { UserRole } from "@/lib/web3/types";
import { useGetUser, useRegisterUser } from "@/lib/web3/hooks/useUser";
import { Loader2, UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface UserRegistrationProps {
  requiredRole: UserRole;
  onRegistered?: () => void;
  children: React.ReactNode;
}

export function UserRegistration({
  requiredRole,
  onRegistered,
  children,
}: UserRegistrationProps) {
  const { address, isConnected } = useAccount();
  const { data: user, isLoading: isLoadingUser, refetch } = useGetUser();
  const { registerUser, isPending, isConfirming, isSuccess, error } =
    useRegisterUser();

  const queryClient = useQueryClient();
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
  });
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [refetchAttempts, setRefetchAttempts] = useState(0);

  // Check if user is registered and has correct role
  const isRegistered = user && user.name && user.name.trim() !== "";
  const hasCorrectRole =
    isRegistered && Number(user.role) === Number(requiredRole);

  // Debug logging (remove in production)
  useEffect(() => {
    console.log("UserRegistration Debug:", {
      user,
      isRegistered,
      hasCorrectRole,
      requiredRole,
      userRole: user?.role,
      userRoleNumber: user?.role ? Number(user.role) : null,
      requiredRoleNumber: Number(requiredRole),
      roleMatch: user?.role
        ? Number(user.role) === Number(requiredRole)
        : false,
      registrationComplete,
      refetchAttempts,
      isSuccess,
      isPending,
      isConfirming,
    });
  }, [
    user,
    isRegistered,
    hasCorrectRole,
    requiredRole,
    registrationComplete,
    refetchAttempts,
    isSuccess,
    isPending,
    isConfirming,
  ]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.summary.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      registerUser({
        name: formData.name,
        summary: formData.summary,
        role: requiredRole,
      });
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  // Handle successful registration
  useEffect(() => {
    if (isSuccess && !registrationComplete) {
      setRegistrationComplete(true);
      setRefetchAttempts(0);

      // Invalidate all contract read queries to ensure fresh data
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "readContract" ||
          (Array.isArray(query.queryKey) && query.queryKey.includes("getUser")),
      });

      // Refetch user data after a short delay to ensure blockchain is updated
      const attemptRefetch = async (attemptCount = 0) => {
        if (attemptCount >= 3) {
          // If after 3 attempts still no success, reload the page
          console.log("Max refetch attempts reached, reloading page...");
          window.location.reload();
          return;
        }

        setTimeout(async () => {
          setRefetchAttempts(attemptCount + 1);
          const result = await refetch();

          // Check if the user now has the correct role
          if (
            result.data &&
            Number(result.data.role) === Number(requiredRole) &&
            result.data.name.trim() !== ""
          ) {
            console.log("Registration successful, user has correct role");
            if (onRegistered) onRegistered();
          } else {
            console.log(
              "Refetch attempt",
              attemptCount + 1,
              "user still not ready:",
              result.data
            );
            // Try again
            attemptRefetch(attemptCount + 1);
          }
        }, 2000 + attemptCount * 1000); // Increase delay with each attempt
      };

      attemptRefetch();
    }
  }, [
    isSuccess,
    registrationComplete,
    queryClient,
    refetch,
    onRegistered,
    requiredRole,
  ]);

  // Reset registration state when user changes
  useEffect(() => {
    if (user && hasCorrectRole) {
      setRegistrationComplete(false);
      setRefetchAttempts(0);
    }
  }, [user, hasCorrectRole]);

  // Reset state when wallet disconnects or changes
  useEffect(() => {
    if (!isConnected || !address) {
      setRegistrationComplete(false);
      setRefetchAttempts(0);
      setFormData({ name: "", summary: "" });
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600">
            Please connect your wallet to continue
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingUser || (registrationComplete && !hasCorrectRole && !error)) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">
            {registrationComplete
              ? `Loading your registration data${
                  refetchAttempts > 0
                    ? ` (attempt ${refetchAttempts}/3)`
                    : "..."
                }`
              : "Checking registration status..."}
          </p>
          {registrationComplete && refetchAttempts > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Waiting for blockchain confirmation...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (registrationComplete && !hasCorrectRole) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been registered. Loading your data...
          </p>
          <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!hasCorrectRole) {
    const roleText =
      requiredRole === UserRole.Organizer ? "Organizer" : "Influencer (KOL)";

    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-2 border-gray-200 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Register as {roleText}
            </h2>
            <p className="text-gray-600">
              Complete your profile to access this feature
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={isPending || isConfirming}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Summary *
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder={
                  requiredRole === UserRole.Organizer
                    ? "Tell us about your company or brand"
                    : "Tell us about your content and audience"
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={isPending || isConfirming}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Role:</strong> {roleText}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {requiredRole === UserRole.Organizer
                  ? "You'll be able to create and manage campaigns"
                  : "You'll be able to apply to campaigns and submit content"}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  {error.message || "Registration failed. Please try again."}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {isPending ? "Confirm in wallet..." : "Registering..."}
                  </span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Register Now</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // User is registered with correct role, show content
  return <>{children}</>;
}
