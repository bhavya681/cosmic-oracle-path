import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, CheckCircle, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consultationType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const consultationTypes = [
    "Personal Astrology Reading",
    "Past Life Regression",
    "Tarot Card Reading",
    "Palm Reading",
    "Spirit Animal Guidance",
    "Dream Interpretation",
    "Relationship Compatibility",
    "Career Guidance",
    "General Consultation"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your message",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.consultationType.trim()) {
      toast({
        title: "Validation Error",
        description: "Please select consultation type",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        "service_er14d93",
        "template_1qstd6f",
        {
          from_name: formData.name || "Anonymous",
          time: new Date().toLocaleString(),
          message: formData.message || "No message provided",
          to_name: "The Hidden Astrologer",
          from_email: formData.email || "no-reply@hiddenastrologer.com",
          from_phone: formData.phone || "Not provided",
          year: new Date().getFullYear(),
        },
        "TifqqkMgwGUe0d1OD"
      );

      if (result.text === "OK") {
        setIsSubmitted(true);
        toast({
          title: "Message Sent! 🌠",
          description: "Your message has been successfully delivered to The Hidden Astrologer.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          consultationType: "",
        });
      } else {
        throw new Error("Email failed to send");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "A cosmic glitch occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        py-16 sm:py-20 md:py-24
        px-2 sm:px-3 md:px-4
        relative overflow-hidden min-h-[80vh] flex items-center justify-center
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up px-2">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-pulse" />
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-foreground">
              Book Your Consultation
            </h2>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-pulse" />
          </div>
          <p className="font-body text-base xs:text-lg sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-1">
            Connect with The Hidden Astrologer for personalized spiritual guidance. Choose your
            consultation type and let the cosmic wisdom flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          {/* Info */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-left">
            <Card className="p-4 xs:p-5 sm:p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
              <h3 className="text-xl xs:text-2xl font-bold mb-4 sm:mb-6 text-primary flex items-center gap-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                Why Choose Our Consultation?
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <li>🔮 Personalized readings based on your astrological profile</li>
                <li>🌟 Guidance from certified astrologers</li>
                <li>🪐 Confidential and compassionate environment</li>
                <li>🌙 Flexible scheduling for your convenience</li>
              </ul>
            </Card>

            <Card className="p-4 xs:p-5 sm:p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
              <h3 className="text-xl xs:text-2xl font-bold mb-4 sm:mb-6 text-primary">Contact Information</h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-muted-foreground break-all">thehiddenastrologer03@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-muted-foreground">Available 24/7 for consultations</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-muted-foreground">Online consultations worldwide</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="animate-fade-in-right">
            <Card className="p-4 xs:p-5 sm:p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <h3 className="text-xl xs:text-2xl font-bold mb-4 sm:mb-6 text-primary">Book Your Session</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                    <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleInputChange}
                      required
                      className="
                        w-full px-3 py-2 rounded-md border border-primary/20 
                        bg-background/70 text-foreground text-sm sm:text-base
                      "
                    >
                      <option value="">Select consultation type</option>
                      {consultationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input name="subject" placeholder="Subject (optional)" value={formData.subject} onChange={handleInputChange} />
                  <Textarea name="message" placeholder="Your message..." rows={5} value={formData.message} onChange={handleInputChange} required />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full bg-gradient-to-r from-purple-600 to-blue-600 
                      hover:from-purple-700 hover:to-blue-700
                      text-base xs:text-lg
                      py-2.5 xs:py-3
                    "
                  >
                    {isSubmitting ? "Sending..." : "Send Consultation Request"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8 xs:py-10 sm:py-12 animate-scale-in">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-3 sm:mb-4 animate-bounce" />
                  <h3 className="text-xl xs:text-2xl font-bold text-green-400 mb-1 sm:mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                    Thank you for reaching out. We’ll contact you soon.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 640px) {
          .max-w-6xl { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
