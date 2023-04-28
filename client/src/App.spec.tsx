import { describe, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
    it('Should render App component', () => {

        const app = render(<App />)

    })
})