import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackApi } from '../services/api';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={24}
            className={
              star <= (hovered || value)
                ? 'fill-gold text-gold'
                : 'fill-none text-sage-light'
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function Feedback() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: '', email: '', rating: 5, experience_type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['feedback'],
    queryFn: () => feedbackApi.getAll(),
  });
  const feedbackList = data?.feedback || [];

  const mutation = useMutation({
    mutationFn: (data) => feedbackApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      setForm({ name: '', email: '', rating: 5, experience_type: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <section className="bg-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
          <h1 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
            Reviews & Feedback
          </h1>
          <p className="mt-2 max-w-lg font-body text-lg text-warm-gray">
            Share your experience and help others on their journey.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Submit Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-charcoal">
                Leave a Review
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Rating
                  </label>
                  <StarRating value={form.rating} onChange={(val) => setForm((prev) => ({ ...prev, rating: val }))} />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Experience Type
                  </label>
                  <select
                    name="experience_type"
                    value={form.experience_type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                  >
                    <option value="">Select...</option>
                    <option value="product">Product Quality</option>
                    <option value="shipping">Shipping</option>
                    <option value="service">Customer Service</option>
                    <option value="overall">Overall Experience</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Your Review *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                  />
                </div>
              </div>

              {submitted && (
                <p className="mt-4 rounded-lg bg-sage/10 p-3 font-body text-sm text-sage-dark">
                  Thank you for your review!
                </p>
              )}
              {mutation.isError && (
                <p className="mt-4 rounded-lg bg-terracotta/10 p-3 font-body text-sm text-terracotta">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="mt-5">
                <Button type="submit" disabled={mutation.isPending} className="w-full">
                  {mutation.isPending ? 'Submitting...' : (
                    <>
                      <Send size={16} className="mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <Loading size="lg" className="py-20" />
            ) : feedbackList.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-heading text-2xl text-charcoal">No reviews yet</p>
                <p className="mt-2 font-body text-sm text-warm-gray">
                  Be the first to share your experience!
                </p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {feedbackList.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    custom={i}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-body text-sm font-semibold text-charcoal">
                          {item.name || 'Anonymous'}
                        </p>
                        {item.experience_type && (
                          <span className="mt-1 inline-block rounded-full bg-sage/10 px-2.5 py-0.5 font-body text-[11px] font-medium capitalize text-sage-dark">
                            {item.experience_type}
                          </span>
                        )}
                      </div>
                      {item.rating && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: item.rating }).map((_, j) => (
                            <Star key={j} size={14} className="fill-gold text-gold" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-3 font-body text-sm leading-relaxed text-warm-gray">
                      {item.message}
                    </p>
                    <p className="mt-3 font-body text-xs text-warm-gray/60">
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
