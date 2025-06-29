import React, { useState, useContext } from 'react';
import { motion } from "framer-motion";
import { ThemeContext } from "../contexts/ThemeContext.jsx"

const UnitConverter = () => {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    const dropclass =  `${isDark ? "bg-[#0f1056]" : "bg-[#E8F9FF]"}`


    const [category, setCategory] = useState('length');
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState('');

    const units = {
        length: ['Meter', 'Kilometer', 'Centimeter', 'Foot', 'Inch'],
        weight: ['Kilogram', 'Gram', 'Pound'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
    };

    const handleConvert = () => {
        let value = parseFloat(inputValue);
        let resultValue = '';

        if (!value || !fromUnit || !toUnit) {
            setResult('Please fill all fields correctly!');
            return;
        }

        if (category === 'length') {
            const conversionRates = {
                Meter: 1,
                Kilometer: 0.001,
                Centimeter: 100,
                Foot: 3.28084,
                Inch: 39.3701
            };

            let valueInMeters = value / conversionRates[fromUnit];
            resultValue = valueInMeters * conversionRates[toUnit];
        }

        else if (category === 'weight') {
            const conversionRates = {
                Kilogram: 1,
                Gram: 1000,
                Pound: 2.20462
            };

            let valueInKg = value / conversionRates[fromUnit];
            resultValue = valueInKg * conversionRates[toUnit];
        }

        else if (category === 'temperature') {
            if (fromUnit === toUnit) {
                resultValue = value;
            } else if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
                resultValue = (value * 9) / 5 + 32;
            } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
                resultValue = value + 273.15;
            } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
                resultValue = ((value - 32) * 5) / 9;
            } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
                resultValue = ((value - 32) * 5) / 9 + 273.15;
            } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
                resultValue = value - 273.15;
            } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
                resultValue = ((value - 273.15) * 9) / 5 + 32;
            }
        }

        setResult(`${inputValue} ${fromUnit} = ${resultValue.toFixed(4)} ${toUnit}`);
    };


    return (
        <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <div className="h-auto flex flex-col items-center gap-4 p-6 bg-blue-800/20 backdrop-blur-[3px] my-4 rounded-lg">
                <h2 className="text-xl font-bold text-center">Unit Converter</h2>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-medium">Choose Category</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setFromUnit('');
                            setToUnit('');
                        }}
                        className="p-2 rounded-md border"
                    >
                        <option className={`${dropclass}`} value="length">Length</option>
                        <option className={`${dropclass}`} value="weight">Weight</option>
                        <option className={`${dropclass}`} value="temperature">Temperature</option>
                    </select>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-medium">Enter Value</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="p-2 rounded-md border [&::-webkit-inner-spin-button]:hidden"
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex-1 flex flex-col">
                        <label className="text-sm font-medium">From</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="p-2 rounded-md border"
                        >
                            <option className={`${dropclass}`} value="">Select</option>
                            {units[category].map((unit) => (
                                <option className={`${dropclass}`} key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="text-sm font-medium">To</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="p-2 rounded-md border"
                        >
                            <option className={`${dropclass}`} value="">Select</option>
                            {units[category].map((unit) => (
                                <option className={`${dropclass}`} key={unit} value={unit}>{unit}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleConvert}
                    className="px-6 bg-[#FFA500] hover:bg-[#ffa600dd] p-2 rounded-md font-semibold"
                >
                    Convert
                </button>

                {result && (
                    <div className="text-center mt-4 p-3  bg-green-100 text-green-800 rounded-md font-medium">
                        {result}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default UnitConverter;
