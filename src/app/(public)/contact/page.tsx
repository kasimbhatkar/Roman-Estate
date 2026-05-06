import ContactClient from './ContactClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Roman Estate Mumbai',
  description: 'Get in touch with Roman Estate for luxury properties in Mumbai. We are here to help you find your dream home.',
};

export default function ContactPage() {
  return <ContactClient />;
}
