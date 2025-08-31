import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Recruitment - Medical Second Opinion Platform',
  description: 'Join our network of distinguished medical professionals providing expert second opinions',
  robots: 'noindex, nofollow', // Keep professional recruitment private
};

interface ProfessionalRecruitmentLayoutProps {
  children: React.ReactNode;
}

export default function ProfessionalRecruitmentLayout({
  children,
}: ProfessionalRecruitmentLayoutProps) {
  return (
    <div data-professional-portal="true" className="professional-recruitment-portal">
      {children}
    </div>
  );
}