"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Scale,
  ExternalLink,
  Mail,
  UserX,
  Link as LinkIcon,
  Ban,
  AlertTriangle,
  Lock,
} from "lucide-react";

// Tailwind + shadcn/ui are available in this environment.
// Replace bracketed placeholders like [Your Website Name] with your real values.

export default function TermsAndPrivacyPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" aria-hidden />
            <span className="font-semibold">[Your Website Name]</span>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border shadow-sm hover:shadow transition"
          >
            <Mail className="h-4 w-4" /> Contact
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-20">
        {/* Terms of Use */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl shadow-sm border overflow-hidden"
        >
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-7 w-7" />
              <h1 className="text-2xl md:text-3xl font-bold">Terms of Use</h1>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Effective Date:</strong>{" "}
              <span>[Insert Effective Date]</span>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Welcome to{" "}
              <span className="font-medium">[Your Website Name]</span>. By
              accessing or using our website, you agree to be bound by these
              Terms of Use.
            </p>

            {/* Terms Sections */}
            <Section id="eligibility" title="1. Eligibility">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You must be <strong>18 years of age or older</strong> to
                  access this website.
                </li>
                <li>
                  By using this site, you confirm that accessing adult content
                  is legal in your jurisdiction.
                </li>
              </ul>
            </Section>

            <Section
              id="disclaimer"
              title="2. Content Disclaimer"
              Icon={AlertTriangle}
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  This website contains sexually explicit and adult content
                  intended strictly for mature audiences.
                </li>
                <li>
                  We do not endorse or permit any illegal, abusive, or
                  non-consensual activities.
                </li>
                <li>
                  All models and performers are at least 18 years old at the
                  time of production.
                </li>
              </ul>
            </Section>

            <Section id="user-resp" title="3. User Responsibilities">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You agree not to share or distribute our content to minors.
                </li>
                <li>
                  You must ensure that viewing adult content is legal in your
                  jurisdiction.
                </li>
              </ul>
            </Section>

            <Section id="ip" title="4. Intellectual Property">
              <p>
                All site content is owned or licensed by us and protected by
                law. Do not reproduce or exploit without permission.
              </p>
            </Section>

            <Section id="prohibited" title="5. Prohibited Conduct" Icon={Ban}>
              <ul className="list-disc pl-5 space-y-2">
                <li>Unlawful use of the site.</li>
                <li>Uploading malware, hacking, or disruption attempts.</li>
              </ul>
            </Section>

            <Section
              id="liability"
              title="6. Limitation of Liability"
              Icon={Scale}
            >
              <p>
                The site is provided <em>“as is”</em>. We are not liable for
                damages resulting from use.
              </p>
            </Section>

            <Section id="termination" title="7. Termination" Icon={UserX}>
              <p>
                We may suspend or terminate access for violations of these
                Terms.
              </p>
            </Section>

            <Section id="law" title="8. Governing Law">
              <p>These Terms shall be governed by [Insert Jurisdiction].</p>
            </Section>

            <Section id="contact" title="9. Contact Us">
              <p>
                If you have questions, email us at{" "}
                <a className="underline" href="mailto:[Insert Email]">
                  [Insert Email]
                </a>
                .
              </p>
            </Section>
          </div>
        </motion.div>

        {/* Privacy Policy */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl shadow-sm border overflow-hidden"
          id="privacy"
        >
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-7 w-7" />
              <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Effective Date:</strong>{" "}
              <span>[Insert Effective Date]</span>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              This Privacy Policy explains how{" "}
              <span className="font-medium">[Your Website Name]</span> collects,
              uses, and protects your personal data when you use our NSFW
              services.
            </p>

            <Section id="info-collected" title="1. Information We Collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>Account details (email, username, password).</li>
                <li>
                  Payment details (processed securely by third-party providers).
                </li>
                <li>
                  Usage data, device information, and cookies for analytics.
                </li>
              </ul>
            </Section>

            <Section id="how-use" title="2. How We Use Information">
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and improve our services.</li>
                <li>To process payments securely.</li>
                <li>To enforce our Terms of Use.</li>
              </ul>
            </Section>

            <Section id="cookies" title="3. Cookies & Tracking">
              <p>
                We use cookies and similar technologies to enhance user
                experience, track site usage, and provide personalized content.
                You may disable cookies in your browser, but some features may
                not function properly.
              </p>
            </Section>

            <Section id="sharing" title="4. Sharing Information">
              <p>
                We do not sell your personal information. Data may be shared
                with trusted service providers (e.g., payment processors,
                hosting providers) to operate the site.
              </p>
            </Section>

            <Section id="security" title="5. Data Security">
              <p>
                We implement reasonable security measures to protect your data.
                However, no online platform is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section id="rights" title="6. Your Rights">
              <ul className="list-disc pl-5 space-y-2">
                <li>Access, update, or delete your personal information.</li>
                <li>Opt-out of marketing communications.</li>
                <li>Request a copy of your data (where legally applicable).</li>
              </ul>
            </Section>

            <Section id="updates" title="7. Updates to Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. Updates
                will be posted here with a new effective date.
              </p>
            </Section>

            <Section id="contact-privacy" title="8. Contact Us About Privacy">
              <p>
                If you have privacy concerns, email us at{" "}
                <a className="underline" href="mailto:[Insert Email]">
                  [Insert Email]
                </a>
                .
              </p>
            </Section>
          </div>
        </motion.div>

        <footer className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} [Your Website Name]. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function Section({ id, title, children, Icon }: SectionProps): JSX.Element {
  return (
    <section id={id} className="scroll-mt-24 border-t first:border-t-0 py-6">
      <div className="flex items-center gap-2 mb-3">
        {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="prose prose-sm max-w-none">{children}</div>
    </section>
  );
}
