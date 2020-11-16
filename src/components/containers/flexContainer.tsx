import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
`;

interface FlexContainerProps {
    children: JSX.Element[] | JSX.Element
}

export const FlexContainer: React.FC<FlexContainerProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}