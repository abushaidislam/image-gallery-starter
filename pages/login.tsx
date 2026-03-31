import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { motion, easeOut } from "framer-motion";
import { MoveRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Logo/Image */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg">
              <Image
                src="/image.png"
                alt="Gallery Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-light text-white mb-2">
              Private Gallery
            </h1>
            <p className="text-zinc-400 text-sm">
              Sign in to access your photos
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 text-red-200 p-3 rounded-xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-12 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-white text-black rounded-xl px-6 py-4 font-medium flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                    />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <MoveRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            <span className="px-4 text-zinc-500 text-xs uppercase tracking-wider">
              Secured
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          </motion.div>

          {/* Security note */}
          <motion.p
            variants={itemVariants}
            className="text-center text-zinc-500 text-xs"
          >
            Protected by NextAuth.js authentication
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
