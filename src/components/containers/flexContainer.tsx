import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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