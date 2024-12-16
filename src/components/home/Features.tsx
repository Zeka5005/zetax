import React from 'react';
import { Shield, Clock, DollarSign, FileText } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      name: 'Maximum Refund Guarantee',
      description: 'Get every dollar you deserve with our accuracy guarantee.',
      icon: DollarSign,
    },
    {
      name: 'Secure & Protected',
      description: 'Your information is encrypted and protected with bank-level security.',
      icon: Shield,
    },
    {
      name: 'Fast Refunds',
      description: 'Get your refund as fast as possible with e-file and direct deposit.',
      icon: Clock,
    },
    {
      name: 'Expert Support',
      description: 'Get help from our tax experts whenever you need it.',
      icon: FileText,
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to file with confidence
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};