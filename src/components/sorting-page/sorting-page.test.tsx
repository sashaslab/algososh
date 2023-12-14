import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";


describe('Testing bubble sorting and selection algorithms', () => {
    jest.setTimeout(40000);
    test('Correctly sorts an empty array using ascending selection sort', () => {
        render(<BrowserRouter><SortingPage arr={[]} /></ BrowserRouter>);
        const select = screen.getByTestId('select')
        const ascending = screen.getByTestId('ascending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(select)
        fireEvent.click(ascending)
        expect(columns).toHaveLength(0)
    })
    test('Correctly sorts an empty array using descending selection sort', () => {
        render(<BrowserRouter><SortingPage arr={[]} /></ BrowserRouter>);
        const select = screen.getByTestId('select')
        const descending = screen.getByTestId('descending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(select)
        fireEvent.click(descending)
        expect(columns).toHaveLength(0)
    })
    test('Correctly sorts an empty array using ascending bubble sort', () => {
        render(<BrowserRouter><SortingPage arr={[]} /></ BrowserRouter>);
        const bubble = screen.getByTestId('bubble')
        const ascending = screen.getByTestId('ascending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(bubble)
        fireEvent.click(ascending)
        expect(columns).toHaveLength(0)
    })
    test('Correctly sorts an empty array using descending bubble sort', () => {
        render(<BrowserRouter><SortingPage arr={[]} /></ BrowserRouter>);
        const bubble = screen.getByTestId('bubble')
        const descending = screen.getByTestId('descending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(bubble)
        fireEvent.click(descending)
        expect(columns).toHaveLength(0)
    })
    test('Correctly sorts an array of one element using ascending selection sort', () => {
        render(<BrowserRouter><SortingPage arr={[10]} /></ BrowserRouter>)
        const select = screen.getByTestId('select')
        const ascending = screen.getByTestId('ascending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(select)
        fireEvent.click(ascending)
        expect(columns).toHaveLength(1)
    })
    test('Correctly sorts an array of one element using descending selection sort', () => {
        render(<BrowserRouter><SortingPage arr={[10]} /></ BrowserRouter>)
        const select = screen.getByTestId('select')
        const descending = screen.getByTestId('descending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(select)
        fireEvent.click(descending)
        expect(columns).toHaveLength(1)
    })
    test('Correctly sorts an array of one element using ascending bubble sort', () => {
        render(<BrowserRouter><SortingPage arr={[10]} /></ BrowserRouter>)
        const bubble = screen.getByTestId('bubble')
        const ascending = screen.getByTestId('ascending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(bubble)
        fireEvent.click(ascending)
        expect(columns).toHaveLength(1)
    })
    test('Correctly sorts an array of one element using descending bubble sort', () => {
        render(<BrowserRouter><SortingPage arr={[10]} /></ BrowserRouter>)
        const bubble = screen.getByTestId('bubble')
        const descending = screen.getByTestId('descending')
        const columns = screen.queryAllByTestId('column')
        fireEvent.click(bubble)
        fireEvent.click(descending)
        expect(columns).toHaveLength(1)
    })
    test('Correctly sorts an array of multiple elements using ascending bubble sort', async () => {
        render(<BrowserRouter><SortingPage arr={[1, 100, 50]} /></ BrowserRouter>)
        const bubble = screen.getByTestId('bubble')
        const ascending = screen.getByTestId('ascending')
        fireEvent.click(bubble)
        fireEvent.click(ascending)
        await waitFor(() => {
            expect(screen.getByTestId('columns').textContent).toBe('150100')
        }, { timeout: 10000 })
    })
    test('Correctly sorts an array of multiple elements using descending bubble sort', async () => {
        render(<BrowserRouter><SortingPage arr={[1, 100, 50]} /></ BrowserRouter>)
        const bubble = screen.getByTestId('bubble')
        const descending = screen.getByTestId('descending')
        fireEvent.click(bubble)
        fireEvent.click(descending)
        await waitFor(() => {
            expect(screen.getByTestId('columns').textContent).toBe('100501')
        }, { timeout: 10000 })
    })
    test('Correctly sorts an array of multiple elements using ascending selection sort', async () => {
        render(<BrowserRouter><SortingPage arr={[1, 100, 50]} /></ BrowserRouter>)
        const select = screen.getByTestId('select')
        const ascending = screen.getByTestId('ascending')
        fireEvent.click(select)
        fireEvent.click(ascending)
        await waitFor(() => {
            expect(screen.getByTestId('columns').textContent).toBe('150100')
        }, { timeout: 10000 })
    })
    test('Correctly sorts an array of multiple elements using descending selection sort', async () => {
        render(<BrowserRouter><SortingPage arr={[1, 100, 50]} /></ BrowserRouter>)
        const select = screen.getByTestId('select')
        const descending = screen.getByTestId('descending')
        fireEvent.click(select)
        fireEvent.click(descending)
        await waitFor(() => {
            expect(screen.getByTestId('columns').textContent).toBe('100501')
        }, { timeout: 10000 })
    })
    
})