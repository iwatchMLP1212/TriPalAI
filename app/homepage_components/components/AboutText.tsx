type AboutTextProps = {
  children: React.ReactNode;
  detail: string;
};

const AboutText: React.FC<AboutTextProps> = ({ children, detail }) => {
  return (
    <div className="block group p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 border border-gray-100">
      <h3
        className={`text-gray-800 text-2xl md:text-3xl font-extrabold mb-4 text-center`}
      >
        <span
          className="text-center bg-gradient-to-r from-primary to-primary/50
        bg-[length:0px_3px] group-hover:bg-[length:100%_3px] bg-left-bottom
        bg-no-repeat transition-[background-size] duration-300"
        >
          {children}
        </span>
      </h3>
      <p className="text-gray-600 leading-relaxed text-lg max-w-prose">
        {detail}
      </p>
    </div>
  );
};

export default AboutText;
