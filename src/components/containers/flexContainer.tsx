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
    overflow-y: auto;
`;

interface FlexContainerProps extends React.HTMLProps<HTMLDivElement> {
}

export const FlexContainer: React.FC<FlexContainerProps> = ({ children, ...rest }) => {
    const htmlProps = rest as any;
    return (
        <Container {...htmlProps}>
            {children}
        </Container>
    )
}