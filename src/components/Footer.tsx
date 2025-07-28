import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { supabase, LogoSettings } from '../lib/supabase';

const Footer = () => {
  const [logoSettings, setLogoSettings] = useState<LogoSettings | null>(null);
  const [loadingLogo, setLoadingLogo] = useState(true);

  useEffect(() => {
    loadLogoSettings();
  }, []);

  const loadLogoSettings = async () => {
    try {
      setLoadingLogo(true);
      const { data, error } = await supabase
        .from('logo_settings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading logo settings:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setLogoSettings(data[0]);
      }
    } catch (error) {
      console.error('Error loading logo settings:', error);
    } finally {
      setLoadingLogo(false);
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook'
    },
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter'
    },
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn'
    },
    {
      icon: Youtube,
      href: '#',
      label: 'YouTube'
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              {logoSettings && logoSettings.logo_url ? (
                <img
                  src={logoSettings.logo_url}
                  alt={logoSettings.logo_name}
                  className="w-[250px] h-[200px] object-cover rounded-2xl shadow-lg"
                  onError={(e) => {
                    // Fallback to default heart icon if logo fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : (
                <div className="w-[250px] h-[200px] bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-lg flex items-center justify-center">
                  <Heart className="h-16 w-16 text-white" />
                </div>
              )}
              {/* Hidden fallback for when logo fails to load */}
              <div className="hidden">
                <div className="w-[250px] h-[200px] bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-lg flex items-center justify-center">
                  <Heart className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>123 Charity Street</p>
                  <p>Community District, City 12345</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>+1 (234) 567-8900</p>
                  <p>Emergency: +1 (234) 567-8902</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>info@mvcharities.org</p>
                  <p>support@mvcharities.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 bg-gray-700 rounded-full text-gray-300 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm">
              Stay connected with us on social media for updates on our programs and community impact.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <p className="text-gray-400 text-sm mb-2 sm:mb-0">
                © 2025 Dream Studios. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin" 
                  className="text-gray-500 hover:text-primary-400 text-xs transition-colors duration-200"
                >
                  Admin Login
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;