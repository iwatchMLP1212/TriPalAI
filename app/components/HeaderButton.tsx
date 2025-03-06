type HeaderButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="rounded-full hover:bg-slate-50 hover:bg-opacity-25 py-2 px-3 transition-all"
      {...props}
    >
      {children}
    </button>
  );
};

export default HeaderButton;
