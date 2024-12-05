import CallToAction from "../../_components/call-to-action";
import PeoplesChoice from "../../_components/peoples-choice/peoples-choice";
import Testimonials from "../../_components/testimonials/testimonials";
import AboutHero from "./_components/about-hero";
import TeamMember from "./_components/teamMember/team-member";

export const metadata = {
  title: "About Us | Khuda-Lagche",
  description:
    "Khudda-Lagche is young fast growing company that works to make your life easier. We take responsibility for making sure that your orders from restaurants are delivered to you safely and quickly",
};

function AboutPage(props) {
  return (
    <>
      <AboutHero />
      <TeamMember />
      <PeoplesChoice bg={true} />
      <Testimonials bg={false} />
      <CallToAction />
    </>
  );
}

export default AboutPage;
