import { useSpring, animated } from 'react-spring';
import { CircleDashed } from 'lucide-react';
import {  useLocation } from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { capturePayment } from '../../store/shop/order-slice';

function PaymentReturn() {
    // const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');
    const dispatch = useDispatch();

    console.log(paymentId , payerId);

    useEffect(() => {

        if(paymentId && payerId ){
            const getCurrentOrdrId = JSON.parse(sessionStorage.getItem('currentOrderId'))

            dispatch(capturePayment({paymentId , payerId , orderId : getCurrentOrdrId})).then((data) => {console.log(data)
                if(data?.payload?.success){
                    sessionStorage.removeItem('currentOrderId');
                    window.location.href = '/shop/paypal-success';
                }
            })
        }

    },[payerId , paymentId , dispatch]);

    const cardAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.8)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { tension: 150, friction: 12 },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-50">
            <animated.div style={cardAnimation} className="bg-white shadow-xl rounded-lg p-8 text-center">
                <CircleDashed  className="text-green-600 mx-auto" size={64} />
                <h1 className="text-3xl font-bold text-yellow-600 mt-4">Payment Pending!!</h1>
                <p className="text-gray-700 mt-2">
                    Your Payment is processing
                </p>
                
            </animated.div>
        </div>
    );
}

export default PaymentReturn;
