import { useStripe } from '@stripe/react-stripe-js';
import { Alert } from 'bootstrap';
import React, { useState, useEffect, Screen } from 'react';

function Checkout() {
    const stripe = useStripe();

    const [loading, setLoading] = useState(false);
    
    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`http://localhost:3000/payment-sheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const { paymentIntent, ephemeralKey, customer} = await response.json();
    
        return {
        paymentIntent,
        ephemeralKey,
        customer};
    };

    const initializePaymentSheet = async () => {
        
        const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await stripe.initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey, 
        paymentIntentClientSecret: paymentIntent, 
        merchantDisplayName: "PrintAbility Inc.",
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        // Optional applePay addition          

        defaultBillingDetails: {
            name: 'Jane Doe',
        }
        });
        if (!error) {
        setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await stripe.presentPaymentSheet();
    
        if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
        Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, [initializePaymentSheet]);
    
    return (
        <Screen>
            <h1>Shopping cart</h1>
            <p>here we have a description of the print job price 
                based on the additionals of therelevant printing parameters</p>
            <button variant="primary" disabled={!loading} 
            onPress={openPaymentSheet}>Continue to Checkout</button>
        </Screen>
    );
}

export default Checkout;