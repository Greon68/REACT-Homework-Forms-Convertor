import './Convertor.css'
import React, { useState, useRef } from 'react';

function Convertor() {
    const [hexValue, setHexValue] = useState('');
    const [rgbValue, setRgbValue] = useState('');

    const hexInputRef = useRef(null);
    const rgbInputRef = useRef(null);

    const [error, setError] = useState('');

    function valid(element) {
        element.style.color = '#202040';
        setError('');
    }

    function invalid(element, otherElement, errorMessage) {
        element.style.color = '#f04624';
        otherElement('');
        setError(errorMessage);
    }

    function toRgb(hexCode) {
        const rgbArr = [];
        if (/^#?[A-Fa-f0-9]{6}$/.test(hexCode)) {
            valid(hexInputRef.current);
            hexCode = hexCode.split('#')[1] || hexCode;
            for (let i = 0; i < hexCode.length; i += 2) {
                rgbArr.push(parseInt(hexCode[i] + hexCode[i + 1], 16));
            }
            setRgbValue(`rgb(${rgbArr.join(', ')})`);
            document.body.style.backgroundColor = `rgb(${rgbArr.join(', ')})`;
        } else {
            invalid(hexInputRef.current, setRgbValue, 'Ошибка ввода HEX');
        }
    }

    
    return (
        <div className="container">
            {/* Поле RGB */}
            <div className="wrapper">
                <label htmlFor="rgb">RGB</label>
                <input
                    type="text"
                    id="rgb"
                    value={rgbValue}
                    ref={rgbInputRef}                    
                />
            </div>
            {/* Поле HEX */}
            <div className="wrapper">
                <label htmlFor="hex">HEX</label>
                <input
                    type="text"
                    id="hex"
                    value={hexValue}
                    onChange={(e) => {
                        setHexValue(e.target.value);
                        toRgb(e.target.value);
                    }}
                    ref={hexInputRef}
                    placeholder="Введите HEX-код"
                />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Палитра цветов: */}
            <div className="color-picker">
                <label htmlFor="color-picker">Выбор цвета:</label>
                <input
                    type="color"
                    id="color-picker"
                    onChange={(e) => {
                        const selectedColor = e.target.value;
                        setHexValue(selectedColor);
                        toRgb(selectedColor);
                    }}
                />
            </div>
        </div>
    );

}

export default  Convertor