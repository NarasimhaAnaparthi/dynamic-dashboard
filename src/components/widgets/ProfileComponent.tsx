import React from "react";

const ProfileComponent: React.FC<{ name: string; role: string }> = ({
  name,
  role,
}) => (
  <div className="p-4 flex justify-center items-center flex-col gap-y-2"> 
    <img src="https://picsum.photos/200" />
    <h3 className="font-bold text-xl">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

export default ProfileComponent;
