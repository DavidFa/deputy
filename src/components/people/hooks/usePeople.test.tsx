import usePeople from './usePeople';
import * as ReactRedux from 'react-redux';
import { renderHook, act } from "@testing-library/react-hooks";
import * as useReduxState from '../../../hooks/hooks';
import { PeopleType } from '../../../models/Types';

describe('testing usePeople hook', () => {
    const mockUseDispatch = jest.fn();
    let peopleMock: PeopleType[] = [];

    const getChangeInputEvent = (value: string) => {
        return {
            currentTarget: {
                value: value,
            }
        } as React.ChangeEvent<HTMLInputElement>;
    }

    const getChangeSelectElement = (value: string): React.ChangeEvent<HTMLSelectElement> => {
        return {
            currentTarget: {
                value: value,
            }
        } as React.ChangeEvent<HTMLSelectElement>;
    }

    const getFormElement = (): React.FormEvent<HTMLFormElement> => {
        return { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
    }

    const generateMockPerson = (i: number): PeopleType => {
        return { "name": `Name ${i}`, "email": `Email_${i}@gmail.com`, "address": `address_${i}`, "status": i % 2 == 1 ? "Employed" : "Discarded", "id": `${i}`, "dob": "", "location": `location_${i}`, "avatarUrl": "" };
    }

    beforeEach(() => {
        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockUseDispatch);
        peopleMock = [];
        for (let i = 1; i <= 10; i++) {
            peopleMock.push(generateMockPerson(i));
        }

        jest.spyOn(useReduxState, 'useAppSelector').mockReturnValue({
            people: peopleMock,
            isLoading: true,
            errorMessage: '',
            isInitial: false
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should dispatch an action to fetch people data when the page load at first time', () => {
        jest.spyOn(useReduxState, 'useAppSelector').mockReturnValue({
            people: [],
            isLoading: true,
            errorMessage: '',
            isInitial: true
        });
        renderHook(() => usePeople());
        expect(mockUseDispatch).toHaveBeenCalled();
    })

    it('should find corresponding people list with filter and filter type', () => {

        const { result } = renderHook(() => usePeople());
        act(() => {
            result.current.onDropdownChangeHandler(getChangeSelectElement("email"));
            result.current.onSearchBarChangeHandler(getChangeInputEvent("@gmail.com"));
        });
        expect(mockUseDispatch).not.toHaveBeenCalled();
        expect(result.current.filter).toBe("@gmail.com");
        expect(result.current.filterBy).toBe("email");

        expect(result.current.filteredPeople.length).toBe(10);

        act(() => {
            result.current.onDropdownChangeHandler(getChangeSelectElement("email"));
            result.current.onSearchBarChangeHandler(getChangeInputEvent("email_1@gmail.com"));
        });
        expect(result.current.filteredPeople.length).toBe(1);

        act(() => {
            result.current.onDropdownChangeHandler(getChangeSelectElement(""));
            result.current.onSearchBarChangeHandler(getChangeInputEvent("email_"));
        });
        expect(result.current.filteredPeople.length).toBe(10);

        act(() => {
            result.current.onDropdownChangeHandler(getChangeSelectElement(""));
            result.current.onSearchBarChangeHandler(getChangeInputEvent("email_test"));
        });
        expect(result.current.filteredPeople.length).toBe(0);
    })

    it('should find the people needed to be viewed', () => {

        const { result } = renderHook(() => usePeople());
        act(() => {
            result.current.onViewClickHandler("1");
        });
        expect(result.current.personEdit).toEqual(generateMockPerson(1));
    })

    it('should popup an alert when personEdit is invalid', () => {
        const jsdomAlert = window.alert;
        window.alert = () => { };

        const { result } = renderHook(() => usePeople());
        act(() => {
            result.current.onViewClickHandler("1");
        });
        expect(result.current.personEdit).toEqual(generateMockPerson(1));

        // set email empty
        act(() => {
            result.current.onPeopleEditChangeHandler(getChangeInputEvent(""), "email");
        });

        act(() => {
            result.current.onPeopleEditFormSubmitHandler(getFormElement());
        });
        expect(mockUseDispatch).not.toHaveBeenCalled();

        window.alert = jsdomAlert;

    })

    it('should dispatch an action when personEdit is valid', () => {

        const { result } = renderHook(() => usePeople());
        act(() => {
            result.current.onViewClickHandler("1");
        });
        expect(result.current.personEdit).toEqual(generateMockPerson(1));

        act(() => {
            result.current.onPeopleEditFormSubmitHandler(getFormElement());
        });
        expect(mockUseDispatch).toHaveBeenCalled();

    })

})