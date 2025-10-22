"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Download,
  ArrowUp,
  ArrowDown,
  Wallet,
  Calendar,
  CreditCard,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { useState } from "react";

export default function Earnings() {
  const [timeRange, setTimeRange] = useState("30d");
  const [filterStatus, setFilterStatus] = useState("all");

  const stats = [
    {
      title: "Total Earnings",
      value: "$12,458",
      change: "+18%",
      isPositive: true,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "This Month",
      value: "$3,245",
      change: "+23%",
      isPositive: true,
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Pending Payments",
      value: "$1,850",
      change: "-5%",
      isPositive: false,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Available Balance",
      value: "$4,120",
      change: "+12%",
      isPositive: true,
      icon: Wallet,
      color: "purple",
    },
  ];

  const transactions = [
    {
      id: "TXN-001",
      campaign: "Summer Product Launch",
      date: "2025-10-18",
      amount: 850,
      status: "completed",
      type: "Campaign Payment",
    },
    {
      id: "TXN-002",
      campaign: "Brand Awareness Q4",
      date: "2025-10-15",
      amount: 1200,
      status: "completed",
      type: "Campaign Payment",
    },
    {
      id: "TXN-003",
      campaign: "Holiday Special",
      date: "2025-10-12",
      amount: 950,
      status: "pending",
      type: "Campaign Payment",
    },
    {
      id: "TXN-004",
      campaign: "Bonus Reward",
      date: "2025-10-10",
      amount: 500,
      status: "completed",
      type: "Bonus",
    },
    {
      id: "TXN-005",
      campaign: "New Year Campaign",
      date: "2025-10-08",
      amount: 1100,
      status: "completed",
      type: "Campaign Payment",
    },
    {
      id: "TXN-006",
      campaign: "Social Media Boost",
      date: "2025-10-05",
      amount: 750,
      status: "failed",
      type: "Campaign Payment",
    },
    {
      id: "TXN-007",
      campaign: "Product Review",
      date: "2025-10-02",
      amount: 650,
      status: "completed",
      type: "Campaign Payment",
    },
    {
      id: "TXN-008",
      campaign: "Performance Bonus",
      date: "2025-09-28",
      amount: 300,
      status: "completed",
      type: "Bonus",
    },
  ];

  const upcomingPayments = [
    {
      campaign: "Autumn Collection",
      amount: 1500,
      dueDate: "2025-10-25",
      status: "Processing",
    },
    {
      campaign: "Tech Review Series",
      amount: 2000,
      dueDate: "2025-10-28",
      status: "Pending Approval",
    },
    {
      campaign: "Fitness Challenge",
      amount: 1200,
      dueDate: "2025-11-02",
      status: "In Review",
    },
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (filterStatus === "all") return true;
    return t.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Earnings & Payments
            </h1>
            <p className="text-gray-600">
              Track your income and manage your payments
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.isPositive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Earnings Overview
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-pink-300 mx-auto mb-3" />
              <p className="text-gray-500">Earnings chart visualization</p>
              <p className="text-sm text-gray-400">
                Monthly earnings breakdown
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Payments
              </h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">
                      ${payment.amount}
                    </p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    {payment.campaign}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {payment.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Transaction History
                </h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {transaction.campaign}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.id} • {transaction.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">
                          ${transaction.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getStatusIcon(transaction.status)}
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Wallet Connection Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Wallet className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Web3 Wallet Connected
                </h3>
                <p className="text-white/90">Wallet Address: 0x1234...abcd</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="px-6 py-3 bg-white text-pink-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Withdraw Funds
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors">
                Change Wallet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
