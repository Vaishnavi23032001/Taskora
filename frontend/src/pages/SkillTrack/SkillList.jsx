import React from "react";
import SkillCard from "./SkillCard.jsx";

export default function SkillList({ skills = [] }) {
  const sampleSkills = skills.length > 0 ? skills : [
    { id: 1, title: "React & Vite", category: "Frontend", level: "Intermediate", targetLevel: "Expert", progress: 65 },
    { id: 2, title: "Node.js & Express", category: "Backend", level: "Beginner", targetLevel: "Advanced", progress: 40 },
    { id: 3, title: "System Architecture", category: "Design", level: "Beginner", targetLevel: "Intermediate", progress: 20 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Your Skills</h3>
        <button className="rounded-2xl bg-gradient-to-r from-[#661cea] to-[#9d5eea] px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:brightness-105">
          + Add Skill
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sampleSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
