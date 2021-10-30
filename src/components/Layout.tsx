import styled from 'styled-components';
import People from './people/People';
import Toolbar from './UI/Toolbar/Toolbar';

const Wrapper = styled.div`
width:100%;
`;

const Main = styled.main`
padding: 0.5rem 3rem
`

const Layout = () => {

    return (
        <Wrapper>
            <Toolbar />
            {/* <SideMenus /> */}
            <Main>
                <People />
            </Main>
        </Wrapper>
    )
}

export default Layout;
