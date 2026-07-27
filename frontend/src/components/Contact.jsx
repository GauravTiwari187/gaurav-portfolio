import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "./Skills.jsx";

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS is not configured — add VITE_EMAILJS_* to frontend/.env");
      setStatus("error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: profile.email,
        },
        publicKey
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Let's connect" title="Contact" />

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <ContactLink icon="✉️" label={profile.email} href={`mailto:${profile.email}`} />
          <ContactLink icon="🐙" label="GitHub" href={profile.github} />
          <ContactLink icon="💼" label="LinkedIn" href={profile.linkedin} />
          {profile.whatsapp && (
            <ContactLink icon="💬" label="WhatsApp" href={profile.whatsapp} />
          )}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className="inline-block mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              ⬇ Download Resume
            </a>
          )}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
        >
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-green-600 text-sm">Message sent — thank you!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm">
              Couldn't send right now. Configure EmailJS in frontend/.env, or email
              directly at {profile.email}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
    </a>
  );
}
