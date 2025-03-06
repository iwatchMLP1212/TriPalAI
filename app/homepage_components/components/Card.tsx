import Link from "next/link";

type CardProps = {
  title: string;
  detail: string;
  className?: string;
  href: string;
};

const Card: React.FC<CardProps> = ({ title, detail, className, href }) => {
  return (
    <div
      className={`group flex flex-col justify-between text-start p-6 md:p-8 pb-4 w-full max-w-xs md:max-w-sm min-h-[14rem] rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 ${className}`}
    >
      <div className="space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {detail}
        </p>
      </div>

      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center text-blue-600 hover:text-blue-900 hover:underline hover:underline-offset-2 font-medium transition-colors duration-200 text-sm md:text-base"
        >
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default Card;
