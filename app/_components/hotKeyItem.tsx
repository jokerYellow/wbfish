import Link from "next/link";
import React from "react";

interface People {
  name: string;
  key: string;
}

const HotKeyItem: React.FC = () => {
  let penny: People = { name: "penny", key: "penny" };
  let tk: People = { name: "tk", key: "mbkeeper" };
  let peoples: People[] = [penny, tk];
  let items = peoples.map((people) => {
    return (
      <div key={people.key}>
        <Link href={`/people?search=${people.key}`}>
          <p className="text-md text-gray-800 ">{people.name}</p>
        </Link>
      </div>
    );
  });
  return <div className="flex flex-row gap-3 mb-3">{items}</div>;
};

export default HotKeyItem;
