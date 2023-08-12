import Image from "next/image";

export const DeGodsBanner = () => {
  return (
    <div className="overflow-hidden fixed flex-1 left-0 right-0 top-0 bottom-0 h-[350px] mt-48 ">
      <div className="absolute left-1/2 -translate-x-1/2 flex h-[350px] w-max mx-auto gap-4">
        <Image
          className="rounded-lg border-2"
          width={350}
          height={350}
          alt="DeGod #1788"
          src="/DeGod1788.png"
        />
        <Image
          className="rounded-lg border-2"
          width={350}
          height={350}
          alt="DeGod #2398"
          src="/DeGod2398.png"
        />
        <Image
          className="rounded-lg border-2"
          width={350}
          height={350}
          alt="DeGod #736"
          src="/DeGod736.png"
        />
      </div>
    </div>
  );
};
