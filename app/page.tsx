import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import WhyWeb from "@/components/WhyWeb";
import Services from "@/components/Services";
import WorkModels from "@/components/WorkModels";
import Stack from "@/components/Stack";
import Process from "@/components/Process";
import Metrics from "@/components/Metrics";
import SiteNote from "@/components/SiteNote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { getGitHubProjects } from "@/lib/github";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressCountry: "BR" },
  sameAs: [site.github.href, site.linkedin.href],
};

export default async function Home() {
  const { projects } = await getGitHubProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <Header />
      <main id="conteudo">
        <Hero />
        <Projects projects={projects} />
        <About />
        <WhyWeb />
        <Services />
        <WorkModels />
        <Stack />
        <Process />
        <Metrics />
        <SiteNote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
