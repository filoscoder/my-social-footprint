import { FlexContainer } from '../../components/containers/flexContainer';
import React from 'react';
import { logout } from '../../lib/api/facebook';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

interface FbSettingsProps extends React.HTMLProps<HTMLDivElement> {
};

export const FbSettings: React.FC<FbSettingsProps> = ({ }) => {

    return (
        <FlexContainer>
            <button onClick={logout}>Log out</button>
        </FlexContainer>
    );
}

const StyledTextText = styled.p<{ color: string, size: number | string }>`
    color: ${(props) => props.color};
    font-size: ${(props) => (typeof props.size === 'number') ? props.size + "px" : props.size};
`

