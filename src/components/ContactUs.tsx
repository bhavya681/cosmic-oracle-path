import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle, Star, Sparkles } from "lucide-react";
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
        "service_bva52eb",
        "template_92ektbs",
        {
          to_name: "The Hidden Astrologer",
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone || "Not provided",
          message: `Consultation Type: ${formData.consultationType}\nSubject: ${formData.subject || "N/A"}\n\n${formData.message}`,
        },
        "TifqqkMgwGUe0d1OD"
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent! 🌠",
          description: "Your cosmic request has been delivered to the astrologer.",
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            consultationType: ""
          });
        }, 3000);
      } else {
        toast({
          title: "Failed to send message.",
          description: "Please try again or check your connection.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "A cosmic glitch occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Cosmic Background */}
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
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
              Book Your Consultation
            </h2>
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with The Hidden Astrologer for personalized spiritual guidance. Choose your
            consultation type and let the cosmic wisdom flow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Section */}
          <div className="space-y-8 animate-fade-in-left">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
              <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <Star className="w-6 h-6" />
                Why Choose Our Consultation?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>🔮 Personalized readings based on your astrological profile</li>
                <li>🌟 Guidance from certified astrologers</li>
                <li>🪐 Confidential and compassionate environment</li>
                <li>🌙 Flexible scheduling for your convenience</li>
              </ul>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
              <h3 className="text-2xl font-bold mb-6 text-primary">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-muted-foreground">thehiddenastrologer@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="text-muted-foreground">Available 24/7 for urgent consultations</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-muted-foreground">Online consultations worldwide</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Section */}
          <div className="animate-fade-in-right">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary">Book Your Session</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground"
                    >
                      <option value="">Select consultation type</option>
                      {consultationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    name="subject"
                    placeholder="Subject (optional)"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    name="message"
                    placeholder="Your message..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isSubmitting ? "Sending..." : "Send Consultation Request"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We’ll contact you within 24 hours.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Animations */}
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
      `}</style>
    </section>
  );
};

export default ContactUs;
