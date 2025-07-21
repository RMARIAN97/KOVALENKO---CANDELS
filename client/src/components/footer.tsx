import { Link } from "wouter";
import { Heart, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/#story" },
    { name: "Candles", href: "/products" },
    { name: "How You Help", href: "/#impact" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-warm-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="text-sunflower text-3xl mr-3" />
              <h3 className="font-display text-2xl font-bold">Kovalenko Candles</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Handcrafted with love from Ukraine. Every candle carries the light of hope and the warmth of family. Thank you for being part of our journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-sunflower transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sunflower transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sunflower transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sunflower transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-sunflower transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Kovalenko Family Candles. Made with ❤️ in Ukraine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
