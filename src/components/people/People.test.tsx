import People from './People';
import { render, screen, fireEvent } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import * as useReduxState from '../../hooks/hooks';
import renderer from 'react-test-renderer';
import { PeopleType } from '../../models/Types';
import userEvent from '@testing-library/user-event';

describe('Testing People Component', () => {

    const mockUseDispatch = jest.fn();
    const setState = jest.fn();
    let peopleMock: PeopleType[] = [];

    const generateMockPerson = (i: number): PeopleType => {
        return { "name": `Name ${i}`, "email": `Email_${i}@gmail.com`, "address": `address_${i}`, "status": i % 2 == 1 ? "Employed" : "Discarded", "id": `${i}`, "dob": "", "location": `location_${i}`, "avatarUrl": "" };
    }

    beforeEach(() => {
        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockUseDispatch);
        peopleMock = [];
        for (let i = 1; i <= 20; i++) {
            peopleMock.push(generateMockPerson(i));
        }

        jest.spyOn(useReduxState, 'useAppSelector').mockReturnValue({
            people: peopleMock,
            isLoading: true,
            errorMessage: '',
            isInitial: false
        });

        render(<People />)
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should match snapshot", () => {
        const component = renderer.create(<People />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should render a loading div', () => {
        expect(screen.getByTestId(/loading/i)).toHaveTextContent("Loading ...");
    })

    it('should render a page title', () => {

        expect(screen.getByTestId("pageTitle")).toBeInTheDocument();
        expect(screen.queryByText(/People/i)).toBeInTheDocument();
        // expect(screen.queryByText(/Title/i)).toBeInTheDocument();
        // expect(screen.queryByText(/Body/i)).toBeInTheDocument();
        // expect(screen.queryByText(/Body/i)).toBeInTheDocument();
        // expect(screen.queryByTestId(/input-title/i)).toBeInTheDocument();
        // expect(screen.queryByTestId(/input-body/i)).toBeInTheDocument();

        // const cancel = screen.getByText(/Cancel/i);
        // expect(cancel).toBeInTheDocument();

        // fireEvent.click(cancel);
        // expect(mockUseDispatch).toHaveBeenCalledTimes(1);

        // const save = screen.getByText(/Save/i);
        // expect(save).toBeInTheDocument();

        // fireEvent.click(save);
        // expect(mockUseDispatch).toHaveBeenCalledTimes(2);
        // // window.alert = jsdomAlert;
    })

    it('should render a filter input', () => {
        expect(screen.getByTestId("searchToolBar")).toBeInTheDocument();
    })

    it('should render a filter dropdown list', () => {
        expect(screen.getByTestId("dropdown")).toBeInTheDocument();
        expect((screen.getByText(/Filter/i) as HTMLOptionElement).selected).toBeTruthy();
    })

    it('should render a DataGrid', () => {
        expect(screen.getByTestId("dataGrid")).toBeInTheDocument();
    })
})