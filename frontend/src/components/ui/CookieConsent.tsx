import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import cookieImg from '../../assets/cookie.png';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 z-50 flex justify-center"
                >
                    <div className="bg-white/90 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl p-4 sm:px-6 sm:py-4 max-w-4xl w-full flex flex-col md:flex-row items-center gap-4 relative overflow-hidden group">

                        {/* Background decorative glow - subtle */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

                        {/* Background Cookie Image (Transparent & Large) */}
                        <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-10 select-none z-0">
                            <img
                                src={cookieImg}
                                alt=""
                                className="w-full h-full object-contain rotate-12"
                            />
                        </div>

                        <div className="flex-1 relative z-10 text-center md:text-left">
                            <h3 className="text-lg font-bold text-gray-900 mb-0.5">Мы используем cookie</h3>
                            <p className="text-gray-600 text-[13px] leading-snug">
                                Чтобы сделать ваше пребывание на <span className="text-primary font-bold">Flock</span> максимально комфортным.
                                <span className="hidden sm:inline"> Продолжая, вы принимаете <a href="#" className="text-primary hover:text-primary-dark underline decoration-primary/30 underline-offset-2 transition-colors">политику конфиденциальности</a>.</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto relative z-10">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDecline}
                                className="flex-1 md:flex-none justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg h-9 px-4"
                            >
                                Отказаться
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleAccept}
                                className="flex-1 md:flex-none justify-center bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10 rounded-lg h-9 px-6"
                            >
                                Принять всё
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

