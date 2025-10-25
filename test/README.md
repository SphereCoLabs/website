# Test Components

This folder contains debug and test components that are temporarily not used in the main application but kept for future reference or testing purposes.

## Components

### CampaignDebug.tsx
- Debug component to display raw campaign data from smart contract
- Shows campaign parsing information and validation
- Useful for troubleshooting campaign data issues

### CreateTestCampaign.tsx  
- Test component for creating sample campaigns
- Used during development to test smart contract integration
- Provides UI for quick campaign creation

## Usage

These components can be temporarily imported back into the main application when needed for debugging or testing:

```tsx
// Import in organizer page for testing
import CampaignDebug from "@/test/CampaignDebug";
import CreateTestCampaign from "@/test/CreateTestCampaign";

// Then use in component
<CampaignDebug />
<CreateTestCampaign />
```

## Note

These components are moved here to keep the main application clean while preserving the code for future use.