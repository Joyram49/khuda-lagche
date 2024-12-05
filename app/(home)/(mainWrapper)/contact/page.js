import dynamic from "next/dynamic";
import ContactInfo from "./_component/contact-content";

export const metadata = {
  title: "Contact Us | Khuda-Lagche",
  description: "Khudda-Lagche is open for 24/7",
};

// Dynamically import the MapContainer component to disable SSR
const MapComponent = dynamic(() => import("./_component/my-map"), {
  ssr: false,
});

const ContactPage = () => {
  return (
    <>
      <MapComponent />
      <ContactInfo />
    </>
  );
};

export default ContactPage;
