"use client";
import Header from "@/components/customer/layout/header";
import { Footer } from "@/components/customer/core/Footer"
import "../index.css";
import { useEffect, useRef } from "react";

const ArticlePage = () => {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h2, h3");
      let currentSection = sections[0];

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop >= 0 && sectionTop <= window.innerHeight / 2) {
          currentSection = section;
        }
      });

      if (navRef.current) {
        const navLinks = navRef.current.querySelectorAll("a");
        navLinks.forEach((link) => link.classList.remove("active"));

        const navLink = navRef.current.querySelector(
          `a[href="#${currentSection.id}"]`
        );

        if (navLink) {
          navLink.classList.add("active");
          navLink.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    };

    const handleNavClick = (event: MouseEvent) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.substring(1);
      const targetElement = document.getElementById(targetId || "");

      if (targetElement) {
        const scrollToPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          window.innerHeight / 4;

        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (navRef.current) {
      const navLinks = navRef.current.querySelectorAll("a");
      navLinks.forEach((link) =>
        link.addEventListener("click", handleNavClick)
      );
    }

    setTimeout(() => {
      if (navRef.current) {
        navRef.current.scrollTop = 0;
        handleScroll();
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navRef.current) {
        const navLinks = navRef.current.querySelectorAll("a");
        navLinks.forEach((link) =>
          link.removeEventListener("click", handleNavClick)
        );
      }
    };
  }, []);

  return (
    <>
      <Header />

      <div className="relative flex justify-center p-10 py-20 pb-40">
        <nav
          className="fixed top-1/2 transform -translate-y-1/2 ml-16 p-2 w-48 h-64 overflow-y-auto custom-scrollbar hidden xl:block"
          ref={navRef}
        >
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#section1">1. Acceptance of Terms</a>
            </li>
            <li>
              <a href="#section2">2. Services Provided</a>
            </li>
            <li>
              <a href="#section3">3. User Accounts</a>
            </li>
            <li className="ml-2">
              <a href="#section3-1">3.1 For Customers</a>
            </li>
            <li className="ml-2">
              <a href="#section3-2">3.2 For Service Providers</a>
            </li>
            <li>
              <a href="#section4">4. User Conduct</a>
            </li>
            <li className="ml-2">
              <a href="#section4-1">4.1 For Customers</a>
            </li>
            <li className="ml-2">
              <a href="#section4-2">4.2 For Service Providers</a>
            </li>
            <li>
              <a href="#section5">5. Service Listings and Transactions</a>
            </li>
            <li className="ml-2">
              <a href="#section5-1">5.1 For Customers</a>
            </li>
            <li className="ml-2">
              <a href="#section5-2">5.2 For Service Providers</a>
            </li>
            <li>
              <a href="#section6">6. Payments and Fees</a>
            </li>
            <li className="ml-2">
              <a href="#section6-1">6.1 For Customers</a>
            </li>
            <li className="ml-2">
              <a href="#section6-2">6.2 For Service Providers</a>
            </li>
            <li>
              <a href="#section7">7. Liability and Disclaimers</a>
            </li>
            <li className="ml-2">
              <a href="#section7-1">7.1 General</a>
            </li>
            <li className="ml-2">
              <a href="#section7-2">7.2 For Customers</a>
            </li>
            <li className="ml-2">
              <a href="#section7-3">7.3 For Service Providers</a>
            </li>
            <li>
              <a href="#section8">8. Intellectual Property</a>
            </li>
            <li>
              <a href="#section9">9. Privacy</a>
            </li>
            <li>
              <a href="#section10">10. Indemnification</a>
            </li>
            <li className="ml-2">
              <a href="#section10-1">10.1 For Customers</a>
            </li>
            <li className="ml-2">
              <a href="#section10-2">10.2 For Service Providers</a>
            </li>
            <li>
              <a href="#section11">11. Termination</a>
            </li>
            <li>
              <a href="#section12">12. Governing Law</a>
            </li>
            <li>
              <a href="#section13">13. Changes to Terms</a>
            </li>
            <li>
              <a href="#section14">14. Contact Information</a>
            </li>
          </ul>
        </nav>

        <div className="article-content">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 py-6 px-5"
            style={{ lineHeight: "1.5" }}
          >
            Logic Auto Terms and Conditions
          </h1>
          <p className="text-gray-500 px-5">Effective Date: August 5, 2024</p>

          <div className="article-content">
            <p className="py-6">
              Welcome to Logic Auto, a marketplace connecting customers with
              independent auto service providers. By accessing or using our
              platform at <a href="www.logicauto.io">www.logicauto.io</a>, you agree to comply with and be
              bound by the following terms and conditions. Please read these
              terms carefully. If you do not agree with these terms, you should
              not use our platform.
            </p>
            <h2 id="section1">1. Acceptance of Terms</h2>
            <p>
              By using the Logic Auto platform, you agree to these Terms and
              Conditions. Logic Auto reserves the right to modify these terms at
              any time. Changes will be posted on this page and will become
              effective upon posting. It is your responsibility to review these
              terms periodically.
            </p>

            <h2 id="section2">2. Services Provided</h2>
            <p>
              Logic Auto provides a platform where users can book auto services
              from independent service providers. We do not directly provide or
              perform any auto services. All services are provided by
              third-party service providers, and Logic Auto is not responsible
              for the quality or outcomes of these services.
            </p>

            <h2 id="section3">3. User Accounts</h2>
            <h3 id="section3-1">3.1 For Customers</h3>
            <p>
              To book services, you may need to create an account. You agree to
              provide accurate and complete information and to keep it updated.
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account.
            </p>
            <h3 id="section3-2">3.2 For Service Providers</h3>
            <p>
              To offer services, you must create an account and provide accurate
              details about your services. You are responsible for maintaining
              the confidentiality of your account credentials and for all
              activities under your account.
            </p>

            <h2 id="section4">4. User Conduct</h2>
            <h3 id="section4-1">4.1 For Customers</h3>
            <p>
              You agree to use the platform only for lawful purposes and in
              compliance with all applicable laws. You must not post content
              that is unlawful, defamatory, or otherwise objectionable.
            </p>
            <h3 id="section4-2">4.2 For Service Providers</h3>
            <p>
              You agree to provide accurate information about your services and
              to comply with all relevant laws and regulations. You must not
              engage in deceptive or fraudulent practices.
            </p>

            <h2 id="section5">5. Service Listings and Transactions</h2>
            <h3 id="section5-1">5.1 For Customers</h3>
            <p>
              When booking services, you agree to provide accurate information
              about your vehicle and service needs. Any issues with services
              should be addressed directly with the service provider.
            </p>
            <h3 id="section5-2">5.2 For Service Providers</h3>
            <p>
              You are responsible for the accuracy of your service listings and
              for fulfilling service commitments. Logic Auto is not responsible
              for verifying the accuracy of listings or transactions.
            </p>

            <h2 id="section6">6. Payments and Fees</h2>
            <h3 id="section6-1">6.1 For Customers</h3>
            <p>
              Payments for services are processed by third-party payment
              processors. Logic Auto does not handle payments directly. Fees for
              services are non-refundable unless stated otherwise.
            </p>
            <h3 id="section6-2">6.2 For Service Providers</h3>
            <p>
              Logic Auto may charge service fees for using the platform. These
              fees will be disclosed before you agree to offer services.
              Payments to you are facilitated through third-party processors.
            </p>

            <h2 id="section7">7. Liability and Disclaimers</h2>
            <h3 id="section7-1">7.1 General</h3>
            <p>
              Logic Auto provides the platform "as is" and makes no warranties
              regarding the operation of the platform or the services provided.
              We disclaim all warranties, including implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <h3 id="section7-2">7.2 For Customers</h3>
            <p>
              Logic Auto is not liable for any damages, injuries, or issues
              arising from the services provided by third-party service
              providers. Any disputes or claims related to the services should
              be resolved directly with the service provider.
            </p>
            <h3 id="section7-3">7.3 For Service Providers</h3>
            <p>
              Logic Auto is not liable for any damages or issues arising from
              the services you provide. You are solely responsible for the
              quality and legality of your services.
            </p>

            <h2 id="section8">8. Intellectual Property</h2>
            <p>
              All content on the Logic Auto website, including text, graphics,
              logos, and software, is the property of Logic Auto or its
              licensors and is protected by intellectual property laws. You may
              not use, reproduce, or distribute any content from the Logic Auto
              platform without prior written permission.
            </p>

            <h2 id="section9">9. Privacy</h2>
            <p>
              Your use of the Logic Auto platform is subject to our Privacy
              Policy, which is incorporated into these terms by reference. By
              using the platform, you consent to the collection and use of your
              information as described in the Privacy Policy.
            </p>

            <h2 id="section10">10. Indemnification</h2>
            <h3 id="section10-1">10.1 For Customers</h3>
            <p>
              You agree to indemnify and hold Logic Auto, its affiliates,
              officers, agents, and employees harmless from any claims arising
              out of your use of the platform or disputes with service
              providers.
            </p>
            <h3 id="section10-2">10.2 For Service Providers</h3>
            <p>
              You agree to indemnify and hold Logic Auto, its affiliates,
              officers, agents, and employees harmless from any claims arising
              out of your services or disputes with customers.
            </p>

            <h2 id="section11">11. Termination</h2>
            <p>
              Logic Auto reserves the right to terminate or suspend your account
              at any time, with or without notice, for any reason, including
              violations of these terms. Upon termination, your right to use the
              platform will cease immediately.
            </p>

            <h2 id="section12">12. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of
              Massachusetts, without regard to its conflict of law principles.
              Any legal action related to these terms shall be brought
              exclusively in the state or federal courts located in Middlesex
              County, Massachusetts.
            </p>

            <h2 id="section13">13. Changes to Terms</h2>
            <p>
              Logic Auto may modify these Terms and Conditions at any time.
              Changes will be posted on this page and will take effect
              immediately upon posting. It is your responsibility to review
              these terms periodically.
            </p>

            <h2 id="section14">14. Contact Information</h2>
            <p>
              For questions or concerns about these Terms and Conditions, please
              contact Logic Auto at:
            </p>
            <p>
              Logic Auto Inc.
              <br />
              Concord, MA
              <br />
              Email: <a href="mailto:support@logicauto.io">support@logicauto.io</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
