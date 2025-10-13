import { Metadata } from "next";
import CampaignCreator from "@/components/campaign/CampaignCreator";

export const metadata: Metadata = {
  title: "Create Campaign | SphereCol",
  description:
    "Create and manage your influencer marketing campaigns with AI-powered insights",
};

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <CampaignCreator />
      </div>
    </div>
  );
}
