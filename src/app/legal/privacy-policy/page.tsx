"use client";
import Header from "@/components/customer/layout/header";
import { Footer } from "@/components/customer/core/Footer";
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

      <div className="relative flex justify-center p-10 py-20">
        <nav
          className="fixed top-1/2 transform -translate-y-1/2 ml-16 p-2 w-48 h-64 overflow-y-auto custom-scrollbar hidden xl:block"
          ref={navRef}
        >
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#section1">1. Types of Information Collected</a>
            </li>
            <li>
              <a href="#section2">2. Use of Information</a>
            </li>
            <li>
              <a href="#section3">3. Sharing and Disclosure of Information</a>
            </li>
            <li>
              <a href="#section4">4. Data Retention</a>
            </li>
            <li>
              <a href="#section5">5. User Rights</a>
            </li>
            <li>
              <a href="#section6">6. International Data Transfers</a>
            </li>
            <li>
              <a href="#section7">7. User Authentication and Security</a>
            </li>
            <li>
              <a href="#section8">8. Dispute Resolution</a>
            </li>
            <li>
              <a href="#section9">9. Cookies and Tracking Technologies</a>
            </li>
            <li>
              <a href="#section10">10. User Consent</a>
            </li>
            <li>
              <a href="#section11">11. Links to Other Sites</a>
            </li>
            <li>
              <a href="#section12">12. Children's Privacy</a>
            </li>
            <li>
              <a href="#section13">13. Changes to this Privacy Policy</a>
            </li>
          </ul>
        </nav>

        <div className="article-content">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 py-6 px-5"
            style={{ lineHeight: "1.5" }}
          >
            Logic Auto Privacy Policy
          </h1>
          <p className="text-gray-500 px-5">Effective Date: August 5, 2024</p>

          <div className="article-content">
            <p className="py-6">
              Logic Auto operates the{" "}
              <a href="www.logicauto.io">www.logicauto.io</a> website, which
              provides a marketplace for booking auto services. This page is
              intended to inform visitors about our practices regarding the
              collection, use, and disclosure of Personal Information for those
              who choose to use our Service through the Logic Auto website.
            </p>
            <p className="py-6">
              By using our Service, you consent to the collection and use of
              information as outlined in this policy. The Personal Information
              we collect is utilized to enhance and improve the Service. We do
              not share your information with others except as detailed in this
              Privacy Policy.
            </p>
            <p className="py-6">
              The definitions in this Privacy Policy are consistent with those
              in our Terms of Use, which are available at{" "}
              <a href="www.logicauto.io">www.logicauto.io</a>, unless specified
              otherwise in this document.
            </p>

            <h2 id="section1">1. Types of Information Collected</h2>
            <p>
              <strong>Transactional Data:</strong> To enhance your experience
              while using our Service, we may ask you to provide certain
              personally identifiable information, such as your name, phone
              number, and postal address. This information will be used to
              contact or identify you as necessary. We collect information
              related to the transactions conducted through our platform,
              including details of services booked, payment information, and
              other data necessary to facilitate your transactions.
            </p>
            <p>
              <strong>Vehicle Information:</strong> To provide and improve our
              services, we collect information about the vehicles for which
              services are booked through our platform. This may include the
              vehicle's make, model, year, registration number, VIN (Vehicle
              Identification Number), mileage, service history, and any issues
              or requirements related to the vehicle.
            </p>
            <p>
              <strong>Log Data:</strong> Whenever you visit our Service, we
              gather information that your browser sends to us, known as Log
              Data. This Log Data may include details such as your computer's
              Internet Protocol ("IP") address, browser type, the pages you
              visit on our Service, the time and date of your visit, the
              duration spent on those pages, and other related statistics.
            </p>
            <p>
              <strong>User-Generated Content:</strong> Any content you submit to
              the platform, such as service reviews, comments, feedback, or
              other materials, will be collected and may be displayed publicly
              or shared with other users as necessary to facilitate
              transactions.
            </p>
            <p>
              <strong>Financial Information:</strong> To process payments and
              complete transactions, we may collect payment details, bank
              account numbers, or other financial information. This information
              is used solely for transaction-related purposes and is shared only
              with trusted third-party payment processors or financial
              institutions.
            </p>
            <p>
              <strong>Verification Data:</strong> To ensure the integrity and
              security of transactions, we may require users to provide identity
              verification information, such as government-issued IDs, proof of
              address, or other documents. This data is used to verify your
              identity and prevent fraudulent activities.
            </p>

            <h2 id="section2">2. Use of Information</h2>
            <p>
              <strong>Transactional Purposes:</strong> The information we
              collect is primarily used to facilitate bookings and transactions
              on our platform, including processing payments, providing customer
              support, and resolving disputes related to your transactions.
            </p>
            <p>
              <strong>Vehicle Services:</strong> We use the vehicle information
              you provide to offer, manage, and improve the auto services booked
              through our platform. This information helps service providers
              understand your vehicle's needs and provide accurate and efficient
              service.
            </p>
            <p>
              <strong>Communication:</strong> We may use your contact
              information to send you updates regarding your transactions,
              changes to our platform, or other important information. You may
              also receive notifications about new features or services that may
              interest you.
            </p>
            <p>
              <strong>Marketing:</strong> With your consent, we may use your
              information to send you promotional materials, special offers, or
              other marketing communications. You have the option to opt-out of
              these communications at any time.
            </p>
            <p>
              <strong>Analytics:</strong> We analyze user behavior and platform
              usage data to improve our Service, enhance user experiences, and
              develop new features. This data helps us understand how users
              interact with our platform and allows us to make informed
              decisions about future improvements.
            </p>

            <h2 id="section3">3. Sharing and Disclosure of Information</h2>
            <p>
              <strong>With Service Providers:</strong> To facilitate
              transactions, your personal, vehicle, and transactional
              information may be shared with auto service providers or payment
              processors involved in the service booking. This sharing is
              necessary to complete the transaction and provide the best
              possible service.
            </p>
            <p>
              <strong>Third-Party Service Providers:</strong> We may engage
              third-party companies and individuals to perform services on our
              behalf, such as payment processing, data analysis, or identity
              verification. These third parties have access to your information
              solely to perform these tasks and are contractually obligated to
              protect your data and use it only for the specified purposes.
            </p>
            <p>
              <strong>Legal Compliance:</strong> We may disclose your
              information if required to do so by law, such as in response to a
              subpoena, court order, or other legal processes. We may also
              disclose your information to protect our rights, property, or the
              safety of our users or others.
            </p>
            <p>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be
              transferred to the new owner. We will notify you if such a
              transfer occurs and ensure that your information remains protected
              under the terms of this Privacy Policy.
            </p>

            <h2 id="section4">4. Data Retention</h2>
            <p>
              <strong>Retention Period:</strong> We retain your information for
              as long as necessary to fulfill the purposes for which it was
              collected, to comply with legal obligations, resolve disputes, and
              enforce our agreements. The retention period may vary depending on
              the type of data and the purpose for which it was collected.
            </p>
            <p>
              <strong>Deletion Requests:</strong> You have the right to request
              the deletion of your personal information at any time. We will
              comply with your request, subject to any legal or operational
              requirements that necessitate the retention of certain data.
              Please note that deleting your information may affect your ability
              to use our Service.
            </p>

            <h2 id="section5">5. User Rights</h2>
            <p>
              <strong>Access and Correction:</strong> You have the right to
              access the personal information we hold about you and to request
              corrections or updates to any inaccuracies. To exercise this
              right, please contact us with your request, and we will respond
              promptly.
            </p>
            <p>
              <strong>Opt-Out:</strong> You may choose to opt-out of receiving
              marketing communications or restrict the sharing of your
              information with third parties for purposes other than transaction
              facilitation. You can manage your preferences through your account
              settings or by contacting us directly.
            </p>
            <p>
              <strong>Data Portability:</strong> You have the right to request a
              copy of your personal data in a commonly used format. This allows
              you to transfer your data to another service provider if you
              choose to do so.
            </p>

            <h2 id="section6">6. International Data Transfers</h2>
            <p>
              <strong>Cross-Border Transfers:</strong> If you are located
              outside of the country where our servers are based, your data may
              be transferred across borders and processed in a country with
              different data protection laws. We take appropriate measures to
              ensure that your data remains protected in compliance with
              applicable laws, regardless of where it is processed.
            </p>

            <h2 id="section7">7. User Authentication and Security</h2>
            <p>
              <strong>Account Security:</strong> You are responsible for
              maintaining the confidentiality of your account credentials,
              including your password. We strongly encourage you to use a
              strong, unique password and to enable two-factor authentication
              where available to enhance the security of your account.
            </p>
            <p>
              <strong>Platform Security Measures:</strong> We employ a variety
              of security measures to protect your information, including
              encryption, secure servers, and regular security audits. While we
              strive to protect your data, please be aware that no security
              system is infallible, and we cannot guarantee the absolute
              security of your information.
            </p>

            <h2 id="section8">8. Dispute Resolution</h2>
            <p>
              <strong>Arbitration Clause:</strong> Any disputes arising out of
              or relating to this Privacy Policy, including any breach or
              alleged breach, will be resolved through binding arbitration in
              accordance with the rules of the American Arbitration Association.
              This means that you waive your right to a trial by jury or to
              participate in a class action lawsuit.
            </p>

            <h2 id="section9">9. Cookies and Tracking Technologies</h2>
            <p>
              <strong>Types of Cookies Used:</strong> We use a variety of
              cookies and tracking technologies to enhance your experience on
              our platform, including session cookies, which expire when you
              close your browser, and persistent cookies, which remain on your
              device for a set period of time. We may also use third-party
              tracking technologies to gather data about your use of our
              Service.
            </p>
            <p>
              <strong>Purpose of Cookies:</strong> Cookies are used to remember
              your preferences, authenticate your sessions, and analyze your
              interactions with our platform. This data helps us provide a more
              personalized experience and improve the overall functionality of
              our Service.
            </p>

            <h2 id="section10">10. User Consent</h2>
            <p>
              <strong>Consent for Data Processing:</strong> By using our
              platform, you consent to the collection, processing, and sharing
              of your data as described in this Privacy Policy. If you do not
              agree to these terms, please do not use our Service.
            </p>
            <p>
              <strong>Consent for Third-Party Services:</strong> In cases where
              we share your data with third-party service providers for purposes
              beyond transaction facilitation, we will seek your explicit
              consent before doing so. You may withdraw your consent at any
              time, but this may affect your ability to use certain features of
              our Service.
            </p>

            <h2 id="section11">11. Links to Other Sites</h2>
            <p>
              <strong>External Links:</strong> Our Service may contain links to
              external websites. If you click on a third-party link, you will be
              directed to that site. Please note that these external sites are
              not operated by us. Therefore, we strongly recommend that you
              review the Privacy Policy of any website you visit. We have no
              control over and assume no responsibility for the content, privacy
              practices, or policies of any third-party sites or services.
            </p>

            <h2 id="section12">12. Children's Privacy</h2>
            <p>
              <strong>Children Under 13:</strong> Our Services are not intended
              for children under the age of 13. We do not knowingly collect
              personally identifiable information from children under 13. In
              compliance with the Children’s Online Privacy Protection Act
              (COPPA), if we become aware that a child under 13 has provided us
              with personal information without verified parental consent, we
              will take immediate steps to delete such information from our
              records.
            </p>
            <p>
              If you are a parent or guardian and you believe your child under
              13 has provided us with personal information without your consent,
              please contact us immediately so that we can take appropriate
              action to remove the information and ensure compliance with
              applicable laws.
            </p>
            <p>
              For more information about COPPA and children's privacy, you can
              visit the Federal Trade Commission's website at www.ftc.gov/coppa.
            </p>

            <h2 id="section13">13. Changes to this Privacy Policy</h2>
            <p>
              <strong>Policy Updates:</strong> We may update our Privacy Policy
              from time to time. Therefore, we encourage you to review this page
              periodically for any changes. Any modifications will be posted on
              this page, and they will become effective immediately upon
              posting.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
