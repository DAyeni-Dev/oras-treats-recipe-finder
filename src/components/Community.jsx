import React, { useState } from 'react';
import { BiHardHat, BiMailSend, BiCheckCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContextBase';
import { NOTIFICATION_DURATION } from '../constants/config';

const Community = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showNotification } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address', 'error', NOTIFICATION_DURATION);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      showNotification('Thanks for subscribing! We\'ll notify you when the community launches.', 'success', NOTIFICATION_DURATION);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
        <div className="w-24 h-24 bg-[#8fbf1a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <BiHardHat className="text-5xl text-[#8fbf1a]" />
        </div>

        <h1 className="text-3xl font-chewy text-[#005c29] mb-4 tracking-wide">
          The Banquet is <span className="text-[#f93270]">Cooking</span>
        </h1>

        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          We're building a vibrant community space where food lovers can connect, share recipes, and inspire each other.
        </p>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-[#005c29]">Be the first to know!</h3>
          <p className="text-sm text-gray-600">Get notified when we launch our community features.</p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8fbf1a] focus:border-transparent outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#8fbf1a] hover:bg-[#7aa516] text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <BiMailSend />
                Notify Me
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <BiCheckCircle className="text-3xl text-[#8fbf1a]" />
              <p className="text-sm text-gray-600">You're on the list!</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#8fbf1a] w-[65%] animate-pulse rounded-full"></div>
          </div>
          <p className="text-xs font-bold text-[#8fbf1a] uppercase tracking-widest">Construction in progress</p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-[#005c29] text-white rounded-full font-bold hover:bg-[#004a21] transition-all transform hover:scale-105 shadow-lg w-full"
        >
          Back to Kitchen
        </Link>
      </div>
    </div>
  );
};

export default Community;
