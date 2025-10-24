import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from "emailjs-com";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        "service_bva52eb", // your service ID
        "template_92ektbs", // your template ID
        {
          to_name: "Bhavya", // 👈 your name (the site owner who receives it)
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone || "Not provided",
          message: formData.message,
        },
        "TifqqkMgwGUe0d1OD" // your public key
      );

      console.log("EmailJS result:", result);
      if (result.status === 200) {
        toast.success("Message sent successfully! ✅");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong while sending the message.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Your Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <Textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}
