import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Statistics from "@/components/home/Statistics";
import Stories from "@/components/home/Stories";
import LatestNews from "@/components/home/LatestNews";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Resources from "@/components/home/Resources";
import GetInvolved from "@/components/home/GetInvolved";
import Partners from "@/components/home/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Statistics />
      <Stories />
      <LatestNews />
      <UpcomingEvents />
      <Resources />
      <GetInvolved />
      <Partners />
    </>
  );
}
