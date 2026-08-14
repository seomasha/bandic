import Image from "next/image";
import logoMark from "../../public/brand/logo-mark.png";

const SIZES = {
  nav: "h-12 w-auto sm:h-14",
  footer: "h-12 w-auto",
};

export default function Logo({ variant = "nav", className = "" }) {
  return (
    <Image
      src={logoMark}
      alt="Poliklinika Bandić"
      priority
      className={`${SIZES[variant]} ${className}`}
    />
  );
}
