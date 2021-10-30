import styled from 'styled-components';
import { DataGridColumns, DataGridRows, DropdownOptionType } from '../../models/Types';
import Dropdown from '../UI/Dropdown/Dropdown';
import SearchToolBar from '../UI/SearchToolbar/SearchToolbar';
import DataGrid from '../UI/Table/DataGrid';
import usePeople from './hooks/usePeople';
import PersonEdit from './PersonEdit';

const Wrapper = styled.div`
width:100%;
`;

const PageTitle = styled.h2`
float:left;
width:100%;
text-align:left
`

const filterOptions: DropdownOptionType<string, string>[] = [
    { value: "name", item: "Name" },
    { value: "email", item: "Email" },
    { value: "address", item: "Address" },
    { value: "status", item: "Status" }
];

const peopleTableHeader: DataGridColumns[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'address', headerName: 'Address' },
    { field: 'location', headerName: 'Location' },
    { field: 'email', headerName: 'Email' },
    { field: 'status', headerName: 'Status' },
    { field: 'action', headerName: '' },
];

const People = () => {

    const { personEdit, isLoading, filterBy, filter, filteredPeople,
        onSearchBarChangeHandler, onDropdownChangeHandler, onViewClickHandler, onPeopleEditChangeHandler, onPeopleEditFormSubmitHandler } = usePeople();

    return (
        <Wrapper>
            {personEdit && <PersonEdit person={personEdit} onChange={onPeopleEditChangeHandler} onSubmit={onPeopleEditFormSubmitHandler} />}
            {/* Here should make a Spinner UI component for the Loading notification, but I just keep it simply as below */}
            {isLoading && <div data-testid="loading">Loading ...</div>}
            <PageTitle data-testid="pageTitle">People</PageTitle>
            <SearchToolBar placeholder="Search People..." onChangeHandler={onSearchBarChangeHandler} value={filter} />
            <Dropdown options={filterOptions} onChangeHandler={onDropdownChangeHandler} value={filterBy} />
            <DataGrid columns={peopleTableHeader} rows={filteredPeople as unknown as DataGridRows[]} onViewClickHandler={onViewClickHandler} />
        </Wrapper>
    )
}

export default People;
