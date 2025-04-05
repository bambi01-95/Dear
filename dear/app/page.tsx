import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Dear</h1>
      <Image
        src="/dear.png"
        alt="Dear Logo"
        width={300}
        height={300}
        className="rounded-full"
      />
    </main>
  );
}
