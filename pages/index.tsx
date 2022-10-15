import type { NextPage } from "next";
import BackgroundGradient from "../components/BackgroundGradient";
import Footer from "../components/Footer";
import LinkForm from "../components/LinkForm";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen mx-auto max-w-7xl flex flex-col text-white">
      <main className="mt-24 flex grow flex-col">
        <BackgroundGradient />
        <LinkForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
