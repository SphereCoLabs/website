import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | SphereCol",
  description: "View comprehensive analytics and insights for your campaigns",
};

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Comprehensive campaign analytics coming soon
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-700">
              Advanced analytics with AI-powered insights will be available here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
