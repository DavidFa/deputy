import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FilterType, PeopleEditKeyType, PeopleType } from '../../../models/Types';
import { actions } from '../../../store/reducers/peopleReducer';
import { fetchPeople } from '../../../store/thunks/peopleThunks';

const usePeople = () => {
    // people fetched by API
    const { people, isLoading, isInitial } = useAppSelector(state => state.people);
    const dispatch = useAppDispatch();
    // corresponding people list shown in the table
    const [filteredPeople, setFilteredPeople] = useState<PeopleType[]>([]);
    // filter client entered
    const [filter, setFilter] = useState<string>('');
    // filter type 
    const [filterBy, setFilterBy] = useState<FilterType | ''>('');
    // person need to be edited
    const [personEdit, setPersonEdit] = useState<PeopleType | undefined>(undefined);

    // only fetch data when the page loads at first time
    useEffect(() => {
        if (isInitial)
            dispatch(fetchPeople(10));
    }, [isInitial, dispatch])

    const getFilteredPeople = useCallback(
        () => {
            const newPeople = people.filter(item => {
                if (!filter.trim()) {
                    return item;
                }
                if (filterBy) {
                    return !filter.trim() || item[filterBy]?.toLowerCase().match(filter.trim().toLowerCase())
                }
                for (const [_, value] of Object.entries(item)) {
                    if (value?.toString().toLowerCase().match(filter.trim().toLowerCase())) return item;
                }
                return false;
            });
            setFilteredPeople([...newPeople]);
        },
        [filter, filterBy, people],
    )

    // Implement debounce, alternatively we can use lodash library
    useEffect(() => {
        const timeout = setTimeout(() => { getFilteredPeople(); }, 300);
        return () => {
            clearTimeout(timeout);
        }
    }, [filter, getFilteredPeople])

    useEffect(() => {
        getFilteredPeople();
    }, [filterBy, people, getFilteredPeople])

    // useCallback will return a memoized callback that only changes if one of the dependencies has changed
    // Taking advantage of conbination of useCallback and React.memo to prevent unnecessery re-render
    const onDropdownChangeHandler = useCallback(
        (event: React.FormEvent<HTMLSelectElement>): void => {
            const filterBy: FilterType = event.currentTarget.value as FilterType;
            setFilterBy(filterBy);
        },
        [],
    )

    // useCallback will return a memoized callback that only changes if one of the dependencies has changed
    // Taking advantage of conbination of useCallback and React.memo to prevent unnecessery re-render
    const onSearchBarChangeHandler = useCallback(
        (event: React.FormEvent<HTMLInputElement>): void => {
            const filter: string = event.currentTarget.value;
            setFilter(filter);
        },
        [],
    )

    const onViewClickHandler = useCallback(
        (personId: string): void => {
            const personEdit = people.find(person => {
                return person.id === personId
            });
            setPersonEdit(personEdit);
        },
        [people],
    )

    const onPeopleEditChangeHandler = useCallback(
        (event: React.FormEvent<HTMLInputElement>, key: PeopleEditKeyType): void => {
            const value = event.currentTarget.value;
            const newPeoson = { ...personEdit } as PeopleType;
            newPeoson[key] = value;
            setPersonEdit(newPeoson);
        },
        [personEdit],
    )

    // this is only an example of validation to validate if email is empty
    const validate = useCallback(
        (): boolean => {
            if (!personEdit?.email) {
                alert("Email is empty!");
                return false
            }
            return true;
        },
        [personEdit],
    )

    const onPeopleEditFormSubmitHandler = useCallback(
        (event: React.FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            if (validate()) {
                dispatch(actions.update(personEdit as PeopleType));
                setPersonEdit(undefined);
            }
        },
        [personEdit, validate, dispatch],
    )

    return { personEdit, people, isLoading, isInitial, filterBy, filter, filteredPeople, validate, onSearchBarChangeHandler, onDropdownChangeHandler, onViewClickHandler, onPeopleEditChangeHandler, onPeopleEditFormSubmitHandler }
}

export default usePeople
