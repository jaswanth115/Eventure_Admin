import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = () => {
    const onToken = (token) => {
        console.log(token)
    }
    return (
        <div>
            <StripeCheckout
                token={onToken}
                name="Eventure"
                currency='USD'
                amount={5000}
                stripeKey="pk_test_51QBmqsF8oaRrzrL1ceA2kr1iS2fqCBIIai4NVirXm2lm4N1bk7yXkejGP4YE0j5cII59DRXMguG1bJqrecrkddoV00T1uff8XQ"
            />
        </div>
    )
};

export default Stripe;
