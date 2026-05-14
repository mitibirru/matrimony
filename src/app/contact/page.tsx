import { siteConfig } from "@/config/site";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="flex-1 bg-muted/20 py-16 sm:py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our support team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row bg-background rounded-[2rem] shadow-sm border border-border/50 overflow-hidden">
          
          {/* Contact Info (Left Side) */}
          <div className="w-full lg:w-[50%] bg-[#10002b] text-white p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
              <p className="text-gray-400 mb-12">We'd love to hear from you. Our friendly team is always here to chat.</p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-full text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Chat to us</h3>
                    <p className="text-sm text-gray-400 mt-1">Our friendly team is here to help.</p>
                    <a href={`mailto:support@${siteConfig.name.toLowerCase()}.com`} className="text-sm font-semibold mt-2 inline-block hover:text-primary transition-colors">
                      support@{siteConfig.name.toLowerCase()}.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-full text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Visit us</h3>
                    <p className="text-sm text-gray-400 mt-1">Come say hello at our office HQ.</p>
                    <p className="text-sm font-semibold mt-2">
                      100 Matrimony Avenue,<br />
                      Tech Park, Hyderabad,<br />
                      Telangana 500081, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-full text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Call us</h3>
                    <p className="text-sm text-gray-400 mt-1">Mon-Fri from 9am to 6pm.</p>
                    <a href="tel:+919876543210" className="text-sm font-semibold mt-2 inline-block hover:text-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="w-full lg:w-[45%] p-10 lg:p-12 flex flex-col justify-center">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-bold">First name</label>
                  <input 
                    type="text" 
                    id="first-name" 
                    className="w-full h-12 px-4 rounded-xl border border-input bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-bold">Last name</label>
                  <input 
                    type="text" 
                    id="last-name" 
                    className="w-full h-12 px-4 rounded-xl border border-input bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full h-12 px-4 rounded-xl border border-input bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full p-4 rounded-xl border border-input bg-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button 
                type="button" 
                className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
