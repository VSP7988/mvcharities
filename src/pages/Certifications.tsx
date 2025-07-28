import React from 'react';
import { useState, useEffect } from 'react';
import { ExternalLink, Award, FileText, Shield } from 'lucide-react';
import { supabase, Certification } from '../lib/supabase';

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error loading certifications:', error);
        return;
      }
      
      setCertifications(data || []);
    } catch (error) {
      console.error('Error loading certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCertificateClick = (pdfUrl?: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Banner Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        >
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-2 text-gray-600">Loading certifications...</span>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certifications Available</h3>
              <p className="text-gray-600">Certifications will appear here once they are added through the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => handleCertificateClick(cert.pdf_url)}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                    cert.pdf_url ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image_url}
                      alt={cert.certificate_name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600";
                      }}
                    />
                    {cert.pdf_url && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                            <ExternalLink className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center text-white font-semibold">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>View Certificate</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {cert.certificate_name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      {cert.pdf_url ? (
                        <div className="flex items-center text-primary-600 font-semibold text-sm">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>View Certificate</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500 text-sm">
                          <Award className="h-4 w-4 mr-2" />
                          <span>Certificate Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Certifications;