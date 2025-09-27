import React from "react";

interface Props {
  params: Promise<{ sem: string }>;
}

const page = async ({ params }: Props) => {
  const { sem } = await params;

  return (
    <div className="flex h-screen justify-center items-center">sem: {sem}</div>
  );
};

export default page;
