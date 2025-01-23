import { motion } from 'framer-motion';

interface Certification {
  logo: string;
  name: string;
  description: string;
  validUntil: string;
  details: string[];
  color: string;
}

interface CertificationCardProps {
  certifications: Certification[];
  index: number;
}

export default function CertificationCard({ certifications, index }: CertificationCardProps) {
  return (
    <>
      {certifications && certifications.length > 0 ? (
        certifications.map((certification, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 min-w-[300px]"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-xl bg-gradient-to-r ${certification.color}`}>
                <img
                  src={certification.logo}
                  alt={certification.name}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{certification.name}</h4>
                <p className="text-sm text-gray-400">{certification.description}</p>
                <p className="text-sm text-yellow-500 mt-1">Valid until: {certification.validUntil}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {certification.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-sm text-gray-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2" />
                  {detail}
                </p>
              ))}
            </div>
          </motion.div>
        ))
      ) : (
        <p>No certifications available.</p>
      )}
    </>
  );
}