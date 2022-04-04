import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    
    it('should render proper info about conversion when PLN -> USD', () => {

      const testCases = [
        { amount: '100', output: 'PLN 100.00 = $28.57' },
        { amount: '20', output: 'PLN 20.00 = $5.71' },
        { amount: '200', output: 'PLN 200.00 = $57.14' },
        { amount: '345', output: 'PLN 345.00 = $98.57' },
     ];  

      for(const testObj of testCases) {

        render(<ResultBox from='PLN' to='USD' amount={parseInt(testObj.amount)} />);    
        const output = screen.getByTestId('output');
    
        expect(output).toHaveTextContent(testObj.output);

        cleanup()
      }
    });

    it('should render proper info about conversion when USD -> PLN', () => {
      
      const testCases = [
        { amount: '100', output: '$100.00 = PLN 350.00' },
        { amount: '20', output: '$20.00 = PLN 70.00' },
        { amount: '200', output: '$200.00 = PLN 700.00' },
        { amount: '345', output: '$345.00 = PLN 1,207.50' },
     ];  

      for(const testObj of testCases) {

        render(<ResultBox from='USD' to='PLN' amount={parseInt(testObj.amount)} />);    
        const output = screen.getByTestId('output');
    
        expect(output).toHaveTextContent(testObj.output);

        cleanup()
      }
    });

    it('should render proper info about conversion when input "from" and "to" have the same value', () => {

      const testCases = [
        { amount: '100', from: 'PLN', to: 'PLN', output: 'PLN 100.00 = PLN 100.00' },
        { amount: '20', from: 'PLN', to: 'PLN', output: 'PLN 20.00 = PLN 20.00' },
        { amount: '200', from: 'USD', to: 'USD', output: '$200.00 = $200.00' },
        { amount: '345', from: 'USD', to: 'USD', output: '$345.00 = $345.00' },
      ];  

      for(const testObj of testCases) {

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);    
        const output = screen.getByTestId('output');
    
        expect(output).toHaveTextContent(testObj.output);

        cleanup()
      }
    });

    it('should render "Wrong value..." when input is lower than 0', () => {

      const testCases = [
        { amount: '-100', from: 'PLN', to: 'PLN', output: 'Wrong value...' },
        { amount: '-20', from: 'PLN', to: 'USD', output: 'Wrong value...' },
        { amount: '-200', from: 'USD', to: 'USD', output: 'Wrong value...' },
        { amount: '-345', from: 'USD', to: 'PLN', output: 'Wrong value...' },
      ];  

      for(const testObj of testCases) {

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);    
        const output = screen.getByTestId('output');
    
        expect(output).toHaveTextContent(testObj.output);

        cleanup()
      }
    });
 });