import { useState, useRef } from 'react';
import styles from './Contact.module.css';
import { interestOptions } from '../../data/contact';

const Contact = () => {
  const [formState, setFormState] = useState({
    status: 'idle', // idle, submitting, success, error
    message: ''
  });
  
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = formRef.current;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Honeypot check
    const formData = new FormData(form);
    if (formData.get('company_url')) {
      // Silently pretend success if honeypot is filled
      setFormState({ status: 'success', message: 'Thank you! Your enquiry has been sent.' });
      form.reset();
      return;
    }

    setFormState({ status: 'submitting', message: '' });

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          setFormState({ status: 'success', message: 'Thank you! Your enquiry has been sent.' });
          form.reset();
        } else {
          setFormState({ status: 'error', message: 'Oops! There was a problem submitting your form.' });
        }
      } catch (error) {
        setFormState({ status: 'error', message: 'Oops! There was a problem submitting your form.' });
      }
    } else {
      // Simulate submission
      setTimeout(() => {
        setFormState({ status: 'success', message: 'Thank you! Your enquiry has been sent (Simulated).' });
        form.reset();
      }, 1000);
    }

    // Auto-hide message
    setTimeout(() => {
      setFormState(prev => ({ ...prev, status: 'idle', message: '' }));
    }, 6000);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.dotgrid}></div>
      <div className="container">
        <div className={`${styles.sectionHead} reveal`} data-reveal="fade-up">
          <span className={styles.eyebrow}>10 — Let’s work together</span>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.desc}>
            Get in touch with us for wholesale enquiries, partnerships, or any questions about our premium Thai produce.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Left Column */}
          <div className={styles.contactInfo} data-reveal="fade-right" data-reveal-delay="100">
            <div className={styles.contactList}>
              {/* Phone */}
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1.1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10.5 20 4 13.5 4 5.6c0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1.1L6.6 10.8Z" stroke="#fff" strokeWidth="1.6"/>
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <strong>Call Us</strong>
                  <span>03-6128 3831</span>
                </div>
              </div>

              {/* Location */}
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" stroke="#fff" strokeWidth="1.6"/>
                    <circle cx="12" cy="9.5" r="2.3" stroke="#fff" strokeWidth="1.6"/>
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <strong>Visit Us</strong>
                  <span>No 21, Jalan Indah 10B, Taman Perindustrian Selayang Indah, 68100 Batu Caves, Selangor</span>
                </div>
              </div>

              {/* Email */}
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v12H4V6Z" stroke="#fff" strokeWidth="1.6"/>
                    <path d="M4 7l8 6 8-6" stroke="#fff" strokeWidth="1.6"/>
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <strong>Email Us</strong>
                  <span>taskinthai503@gmail.com</span>
                </div>
              </div>

              {/* Website */}
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.6"/>
                    <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" stroke="#fff" strokeWidth="1.6"/>
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <strong>Website</strong>
                  <span>www.taskinthai.com</span>
                </div>
              </div>
            </div>

            <iframe 
              className={styles.mapIframe}
              src="https://www.google.com/maps?q=No.21,+Jalan+Indah+10B,+Taman+Perindustrian+Selayang+Indah,+68100+Batu+Caves,+Selangor&output=embed" 
              width="100%" 
              height="220px" 
              title="Taskin Thai location map"
              loading="lazy"
            ></iframe>
          </div>

          {/* Right Column */}
          <div className={`${styles.formCard} reveal`} data-reveal="fade-left" data-reveal-delay="200">
            <h3 className={styles.formTitle}>Send us an enquiry</h3>
            
            <form ref={formRef} noValidate onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="fname">Full name</label>
                  <input type="text" id="fname" name="fname" placeholder="Ahmad bin Ismail" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="fphone">Phone</label>
                  <input type="tel" id="fphone" name="fphone" placeholder="012-345 6789" required />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="femail">Email</label>
                <input type="email" id="femail" name="femail" placeholder="you@company.com" required />
              </div>

              <div className={styles.field}>
                <label htmlFor="finterest">Interest</label>
                <select id="finterest" name="finterest" required defaultValue="">
                  <option value="" disabled>Select your interest</option>
                  {interestOptions.map((opt, index) => (
                    <option key={index} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="fmsg">Message</label>
                <textarea id="fmsg" name="fmsg" placeholder="Tell us what you need..." required></textarea>
              </div>

              {/* Honeypot field */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                <label htmlFor="company_url">Leave empty</label>
                <input type="text" id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
              </div>

              {formState.message && (
                <div className={`${styles.statusMessage} ${formState.status === 'success' ? styles.success : styles.error}`}>
                  {formState.message}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn btn-primary ${styles.submitBtn}`} 
                disabled={formState.status === 'submitting'}
              >
                {formState.status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              <p className={styles.privacyNotice}>
                By submitting this form, you consent to Taskin Thai Vegetables & Fruits Sdn Bhd collecting and processing your personal data for the purpose of responding to your enquiry, in accordance with Malaysia's Personal Data Protection Act 2010 (PDPA).
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
