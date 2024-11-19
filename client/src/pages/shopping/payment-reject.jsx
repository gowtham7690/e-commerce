
import { useSpring, animated } from 'react-spring';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function PaymentRejected() {
    const navigate = useNavigate();

    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.8)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { tension: 150, friction: 12 },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50">
            <animated.div style={cardAnimation} className="bg-white shadow-xl rounded-lg p-8 text-center">
                <AlertCircle className="text-red-600 mx-auto" size={64} />
                <h1 className="text-3xl font-bold text-red-600 mt-4">Payment Failed!</h1>
                <p className="text-gray-700 mt-2">
                    Unfortunately, your payment could not be processed. Please try again or contact support.
                </p>
                <button
                    className="bg-red-500 text-white px-6 py-2 rounded-md mt-6 hover:bg-red-600 transition"
                    onClick={() => navigate('/shop/checkout')}
                >
                    Retry Payment
                </button>
            </animated.div>
        </div>
    );
}

export default PaymentRejected;
