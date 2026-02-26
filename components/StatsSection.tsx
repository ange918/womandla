"use client";

import { motion } from "framer-motion";
import { 
  BuildingOffice2Icon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  BanknotesIcon 
} from "@heroicons/react/24/outline";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    icon: BuildingOffice2Icon,
    label: "Communes ciblées",
    value: 77,
    suffix: "",
  },
  {
    icon: UserGroupIcon,
    label: "Bénéficiaires potentielles",
    value: 3850,
    suffix: "",
  },
  {
    icon: AcademicCapIcon,
    label: "Femmes par commune",
    value: 50,
    suffix: "",
  },
  {
    icon: BanknotesIcon,
    label: "Budget / commune",
    value: 15,
    suffix: "M FCFA",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-light p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <stat.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-dark mb-2">
                <AnimatedCounter value={stat.value} />
                <span className="text-xl ml-1">{stat.suffix}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
