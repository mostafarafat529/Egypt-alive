import { useState } from "react";
import { faqs, contactInfo } from "../../data/contact";
import { messageService } from "../../services/messageService";
import { useToast } from "../../components/ui/Toast";
import LoadingButton from "../../components/ui/LoadingButton";
import { FormError, inputClass } from "../../components/ui/FormError";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 3) errors.name = "Name must be at least 3 characters";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email address";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!/^[\d+\s()-]{7,}$/.test(form.phone)) errors.phone = "Invalid phone number";
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10) errors.message = "Message must be at least 10 characters";
  return errors;
}

export default function ContactUs() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors below.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      messageService.create(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData(initialForm);
      setErrors({});
      setLoading(false);
    }, 800);
  }

  return (
    <div className="bg-[#F8F5EF] pt-28">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 text-center">
        <span className="uppercase tracking-[4px] text-primary text-sm">Contact Us</span>
        <h1 className="font-heading text-5xl text-dark mt-4">We&apos;d Love To Hear From You</h1>
        <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
          Whether you&apos;re planning your dream Egyptian adventure or simply have a question, our travel specialists are always ready to help.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-heading text-3xl text-dark mb-8">Get In Touch</h2>
            <div className="space-y-7">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="text-dark text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.value}</p>
                      {item.value2 && <p className="text-gray-600">{item.value2}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-heading text-3xl text-dark mb-8">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5 text-dark">
              <div>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass("name", errors)} />
                <FormError message={errors.name} />
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass("email", errors)} />
                <FormError message={errors.email} />
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClass("phone", errors)} />
                <FormError message={errors.phone} />
              </div>
              <div>
                <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className={inputClass("subject", errors)} />
                <FormError message={errors.subject} />
              </div>
              <div>
                <textarea rows="5" name="message" placeholder="Write your message..." value={formData.message} onChange={handleChange} className={`${inputClass("message", errors)} resize-none`} />
                <FormError message={errors.message} />
              </div>
              <LoadingButton
                type="submit"
                loading={loading}
                loadingText="Sending..."
                className="bg-primary text-dark font-semibold px-8 py-4 rounded-lg hover:scale-105"
              >
                Send Message
              </LoadingButton>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe title="Egypt Map" src="https://www.google.com/maps?q=Cairo,Egypt&output=embed" className="w-full h-[450px]" loading="lazy" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-24">
        <div className="text-center mb-14">
          <span className="uppercase tracking-[4px] text-primary text-sm">FAQ</span>
          <h2 className="font-heading text-4xl text-dark mt-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-dark text-lg mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
