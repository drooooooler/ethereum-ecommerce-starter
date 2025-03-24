import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-[750px] mx-auto">
      <Image
        priority
        src="about-banner.jpg"
        alt={"about-banner-image"}
        width={440}
        height={374}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div className="p-[20px] md:p-0 md:pt-[20px] flex flex-col gap-[10px]">
        <p>
          For shits and giggles. 
        </p>
      </div>
    </div>
  );
}
