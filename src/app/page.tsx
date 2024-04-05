import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("./calendar"), {
  ssr: false,
});

export default function Home() {
  return <Calendar />;
}
