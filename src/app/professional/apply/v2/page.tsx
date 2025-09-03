import { Metadata } from 'next';
import DualPathApplicationFlow from '@/components/professional/v2/DualPathApplicationFlow';

export const metadata: Metadata = {
  title: 'Professional Application - Medical Second Opinion Platform',
  description: 'Join our network of medical professionals. Choose between AI-assisted or manual application process.',
};

export default function ProfessionalApplicationV2Page() {
  return <DualPathApplicationFlow />;
}