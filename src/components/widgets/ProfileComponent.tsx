import React from "react";

const ProfileComponent: React.FC<{ name: string; role: string }> = ({
  name,
  role,
}) => (
  <div className="p-4 text-center">
    <h3 className="font-bold text-xl">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

export default ProfileComponent;
