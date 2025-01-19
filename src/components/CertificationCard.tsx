import { motion } from 'framer-motion';

interface Certification {
  logo: string;
  name: string;
  description: string;
  validUntil: string;
}

interface CertificationCardProps {
  cert: Certification;
  index: number;
}

export default function CertificationCard({ cert, index }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 min-w-[300px]"
    >
      <div className="flex items-center space-x-4">
        <img
          src={cert.logo}
          alt={cert.name}
          className="h-16 w-16 object-contain"
        />
        <div>
          <h4 className="text-lg font-semibold text-white">{cert.name}</h4>
          <p className="text-sm text-gray-400">{cert.description}</p>
          <p className="text-sm text-yellow-500 mt-1">Valid until: {cert.validUntil}</p>
        </div>
      </div>
    </motion.div>
  );
}
