import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from './Button';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after small delay
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
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-center"
                >
                    <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-6 max-w-4xl w-full flex flex-col md:flex-row items-center gap-6">

                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full flex-shrink-0">
                            <Icon icon="solar:cookie-bold-duotone" className="w-6 h-6 text-primary" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Мы используем cookie</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Это помогает нам улучшать работу сайта и персонализировать контент.
                                Оставаясь на сайте, вы соглашаетесь с нашей <a href="#" className="text-primary hover:underline font-medium">политикой конфиденциальности</a>.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDecline}
                                className="whitespace-nowrap"
                            >
                                Отказаться
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleAccept}
                                className="whitespace-nowrap shadow-lg shadow-primary/20"
                            >
                                Принять все
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
