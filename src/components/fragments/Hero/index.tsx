"use client";
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="bg-dark text-white border py-4 px-6 rounded-lg flex items-center justify-between gap-4 h-40">
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg font-light">{subtitle}</p>
      </div>
      <div>
        <Image src={imageSrc} alt={title} width={120} height={120} />
      </div>
    </div>
  );
};

export default Hero;
