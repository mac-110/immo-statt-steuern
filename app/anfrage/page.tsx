"use client";

import dynamic from "next/dynamic";

const LeadForm = dynamic(() => import("./LeadForm"), { ssr: false });

export default function AnfragePage() {
  return <LeadForm />;
}
