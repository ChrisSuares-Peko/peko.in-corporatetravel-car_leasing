import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import VehicleCard from '../../components/addVehicle/VehicleCard';


vi.mock('../../utils/data', () => ({
  renewalCardsData: [
    { icon: 'icon1', title: 'Insurance', renewalDate: '10-10-2025', bgColor: '#eee' },
    { icon: 'icon2', title: 'Fitness', renewalDate: '11-11-2025', bgColor: '#ddd' },
  ],
}));

vi.mock('../../assets/car.png', () => ({
  default: 'car.png'
}));

describe('VehicleCard Component', () => {
  test('renders vehicle image', () => {
    render(<VehicleCard />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders renewal cards from data', () => {
    render(<VehicleCard />);
    expect(screen.getByText('Insurance')).toBeInTheDocument();
    expect(screen.getByText('Fitness')).toBeInTheDocument();
  });

  test('displays vehicle overview details', () => {
    render(<VehicleCard />);
    expect(screen.getByText('Vehicle No.')).toBeInTheDocument();
    expect(screen.getByText('KL 39 G 9990')).toBeInTheDocument();
    expect(screen.getByText('Fuel Type')).toBeInTheDocument();
    expect(screen.getByText('Diesel')).toBeInTheDocument();
  });

  test('displays registration & tax details', () => {
  render(<VehicleCard />);

  expect(screen.getByText('Registration & Tax')).toBeInTheDocument();

  expect(screen.getAllByText('02.10.2030')).toHaveLength(3);

  expect(screen.getByText('Vehicle Age')).toBeInTheDocument();
});


  test('renders RTO / Authority section', () => {
    render(<VehicleCard />);
    expect(
      screen.getByText('Mini Civil Station, Tripunithura, Ernakulam - 682301')
    ).toBeInTheDocument();
    expect(screen.getByText('RTO / Authority')).toBeInTheDocument();
  });
});
