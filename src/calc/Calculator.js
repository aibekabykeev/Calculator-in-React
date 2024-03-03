import React, { useState, useCallback } from 'react';
import styles from './Calculator.module.css';

const Calculator = React.memo(() => {
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const performCalculation = useCallback(() => {
        const inputValue = parseFloat(display);
        switch (operator) {
            case '+':
                return firstOperand + inputValue;
            case '-':
                return firstOperand - inputValue;
            case '*':
                return firstOperand * inputValue;
            case '/':
                return firstOperand / inputValue;
            default:
                return inputValue;
        }
    }, [display, firstOperand, operator]);

    const inputDigit = useCallback((digit) => {
        if (waitingForSecondOperand) {
            setDisplay(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    }, [display, waitingForSecondOperand]);

    const inputDecimal = useCallback(() => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    }, [display]);

    const clearDisplay = useCallback(() => {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    }, []);

    const handleOperator = useCallback((nextOperator) => {
        const inputValue = parseFloat(display);

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = performCalculation();
            setDisplay(String(result));
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    }, [display, firstOperand, operator, performCalculation]);

    return (
        <div className={styles.calculator}>
            <div className={styles.display}>{display}</div>
            <div className={styles.buttons}>
                <button className={styles.function} onClick={clearDisplay}>AC</button>
                <button className={styles.function} onClick={() => setDisplay(String(parseFloat(display) * -1))}>+/-</button>
                <button className={styles.function} onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
                <button className={styles.operator} onClick={() => handleOperator('/')}>/</button>
                <button onClick={() => inputDigit(7)}>7</button>
                <button onClick={() => inputDigit(8)}>8</button>
                <button onClick={() => inputDigit(9)}>9</button>
                <button className={styles.operator} onClick={() => handleOperator('*')}>*</button>
                <button onClick={() => inputDigit(4)}>4</button>
                <button onClick={() => inputDigit(5)}>5</button>
                <button onClick={() => inputDigit(6)}>6</button>
                <button className={styles.operator} onClick={() => handleOperator('-')}>-</button>
                <button onClick={() => inputDigit(1)}>1</button>
                <button onClick={() => inputDigit(2)}>2</button>
                <button onClick={() => inputDigit(3)}>3</button>
                <button className={styles.operator} onClick={() => handleOperator('+')}>+</button>
                <button className={styles.zero} onClick={() => inputDigit(0)}>0</button>
                <button onClick={inputDecimal}>.</button>
                <button className={styles.operator} onClick={() => {
                    const result = performCalculation();
                    setDisplay(String(result));
                    setFirstOperand(null);
                    setOperator(null);
                    setWaitingForSecondOperand(false);
                }}>=</button>
            </div>
        </div>
    );
});

export default Calculator;
