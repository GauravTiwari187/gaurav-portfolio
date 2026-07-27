import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { api } from "../utils/api.js";

import { fallbackProfile } from "../data/profileData.js";

import ThemeToggle from "../components/ThemeToggle.jsx";



export default function Landing() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(fallbackProfile);



  useEffect(() => {

    api

      .getProfile()

      .then(setProfile)

      .catch(() => setProfile(fallbackProfile));

  }, []);



  return (

    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-500">

      <div className="absolute top-6 right-6">

        <ThemeToggle />

      </div>



      {/* decorative blobs */}

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-400/30 rounded-full blur-3xl animate-pulse" />

      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />



      <motion.div

        initial={{ opacity: 0, scale: 0.85 }}

        animate={{ opacity: 1, scale: 1 }}

        transition={{ duration: 0.8, ease: "easeOut" }}

        className="relative z-10 flex flex-col items-center text-center px-6"

      >

        <motion.div

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.2, duration: 0.6 }}

          className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1.5 bg-gradient-to-tr from-brand-500 to-purple-500 shadow-2xl shadow-brand-500/30"

        >

          <img

            src={profile.photoUrl}

            alt={profile.name}

            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-950"

            onError={(e) => {

              e.currentTarget.src =

                "https://ui-avatars.com/api/?name=Gaurav+Tiwari&size=512&background=6366f1&color=fff";

            }}

          />

        </motion.div>



        <motion.h1

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.5, duration: 0.6 }}

          className="mt-8 text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white"

        >

          {profile.name}

        </motion.h1>



        <motion.p

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ delay: 0.7, duration: 0.6 }}

          className="mt-3 text-lg md:text-xl text-slate-600 dark:text-slate-300"

        >

          {profile.tagline}

        </motion.p>



        <motion.button

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 1, duration: 0.6 }}

          whileHover={{ scale: 1.06 }}

          whileTap={{ scale: 0.96 }}

          onClick={() => navigate("/portfolio")}

          className="mt-10 px-8 py-3.5 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-brand-600 to-purple-600 shadow-lg shadow-brand-600/30 hover:shadow-xl hover:shadow-brand-600/40 transition-shadow"

        >

          Visit Profile →

        </motion.button>

      </motion.div>

    </div>

  );

}
