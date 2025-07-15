import GoogleAnalytics from "@/components/metrics/GoogleAnalytics";
import MicrosoftClarity from "@/components/metrics/MicrosoftClarity";

export default function Metrics() {
  if (process.env.DEV_MODE === "true") return null;

  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
    </>
  );
}
