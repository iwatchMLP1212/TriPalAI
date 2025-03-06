import { motion } from "framer-motion";

const SendingChatBubble = () => {
  return (
    <div className="flex gap-1 max-w-fit whitespace-break-spaces p-4 mb-6 rounded-full shadow-sm bg-gray-200 text-gray-800 self-start">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          custom={i}
          animate={{ y: [0, -5, 0], opacity: [1, 0.25, 1] }}
          transition={{
            duration: 1.2 + i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            width={6}
            height={6}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill={"black"} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default SendingChatBubble;
