import React, { useState, useEffect } from 'react';
import currencyCodes from 'currency-codes';
import '../pages/OnboardingForm.css'

const PricingConfiguration = ({ formData, handleChange }) => {

    const [currencyList, setCurrencyList] = useState([]);

    useEffect(() => {
        const codes = currencyCodes.codes();

        const currencyData = codes.map(code => ({
            code,
            name: currencyCodes.code(code)[1]
        }));

        setCurrencyList(currencyData);
    }, []);

    return (
        <div className="content">
            <h3>Pricing Configuration</h3>

            <div className="form-group">
                <label>Payments Currency:</label>
                <select class="form-select-sm" aria-label="Default select example" name="paymentsCurrency"
                    value={formData.paymentsCurrency}
                    onChange={handleChange}
                    required>
                    {currencyList.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.code}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">
                    Black and White Page Cost: {formData.blackAndWhitePageCost}
                </label>
                
                <input
                    type="range"
                    className="form-range"
                    min="0.0"
                    max="0.3"
                    step="0.01"
                    id="blackAndWhitePageCostRange"
                    name="blackAndWhitePageCost"
                    value={formData.blackAndWhitePageCost}
                    onChange={handleChange}
                    required
                />
                <div className="form-group">
                    <label className="form-label">
                        Colored Page Cost: {formData.coloredPageCost}
                    </label>
                    <input
                        type="range"
                        className="form-range"
                        min="0.0"
                        max="1.2"
                        step="0.01"
                        id="coloredPageCostRange"
                        name="coloredPageCost"
                        value={formData.coloredPageCost}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>
        </div>
    );
};

            export default PricingConfiguration;
