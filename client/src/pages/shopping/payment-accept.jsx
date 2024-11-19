import { useSpring, animated } from 'react-spring';
import { CheckCircle } from 'lucide-react';
import { useNavigate  } from 'react-router-dom';


function PaymentSuccess() {
    const navigate = useNavigate();
    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.8)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { tension: 150, friction: 12 },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-50">
            <animated.div style={cardAnimation} className="bg-white shadow-xl rounded-lg p-8 text-center">
                <CheckCircle className="text-green-600 mx-auto" size={64} />
                <h1 className="text-3xl font-bold text-green-600 mt-4">Payment Successful!</h1>
                <p className="text-gray-700 mt-2">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-md mt-6 hover:bg-green-600 transition"
                    onClick={() => navigate('/shop/home')}
                >
                    Continue Shopping
                </button>
                <button onClick={notify}>Notify!</button>
            </animated.div>
        </div>
    );
}

export default PaymentSuccess;
