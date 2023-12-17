import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { StringComponent } from "./string";

describe('Testing the line reversal algorithm', () => {
    test('Correctly reverses a string with an even number of characters', async () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const btn = screen.getByTestId('button');
        fireEvent.change(input, { target: { value: 'Oleg' } });
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getAllByTestId('letter')[0].textContent).toBe('g')
            expect(screen.getAllByTestId('letter')[1].textContent).toBe('l')
            expect(screen.getAllByTestId('letter')[2].textContent).toBe('e')
            expect(screen.getAllByTestId('letter')[3].textContent).toBe('O')
        }, { timeout: 1000 })
        await waitFor(() => {
            expect(screen.getAllByTestId('letter')[0].textContent).toBe('g')
            expect(screen.getAllByTestId('letter')[1].textContent).toBe('e')
            expect(screen.getAllByTestId('letter')[2].textContent).toBe('l')
            expect(screen.getAllByTestId('letter')[3].textContent).toBe('O')
        }, { timeout: 1000 })
    });
    test('Correctly expands a string with an odd number of characters', async () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const btn = screen.getByTestId('button');
        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getAllByTestId('letter')[0].textContent).toBe('o')
            expect(screen.getAllByTestId('letter')[1].textContent).toBe('e')
            expect(screen.getAllByTestId('letter')[2].textContent).toBe('l')
            expect(screen.getAllByTestId('letter')[3].textContent).toBe('l')
            expect(screen.getAllByTestId('letter')[4].textContent).toBe('H')
        }, { timeout: 1000 })
        await waitFor(() => {
            expect(screen.getAllByTestId('letter')[0].textContent).toBe('o')
            expect(screen.getAllByTestId('letter')[1].textContent).toBe('l')
            expect(screen.getAllByTestId('letter')[2].textContent).toBe('l')
            expect(screen.getAllByTestId('letter')[3].textContent).toBe('e')
            expect(screen.getAllByTestId('letter')[4].textContent).toBe('H')
        }, { timeout: 1000 })
    })
    test('Correctly expands a string with one character', () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        const btn = screen.getByTestId('button');
        fireEvent.change(input, { target: { value: 'A' } });
        fireEvent.click(btn);
        expect(screen.getAllByTestId('letter')[0]).toHaveTextContent('A')
    })
    test('Correctly expands an empty string', () => {
        render(<BrowserRouter><StringComponent /></BrowserRouter>);
        const input = screen.getByTestId('input');
        fireEvent.change(input, { target: { value: '' } });
        expect(screen.getByTestId('button')).toBeDisabled()
    })
});